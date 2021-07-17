const removeNull = (obj) => {
    Object.keys(obj).forEach(k =>
        (obj[k] && typeof obj[k] === 'object') && removeNull(obj[k])
        ||
        !obj[k] && delete obj[k]
    );
    return obj;
};

class DuaMessage {
    constructor(update, more = {}) {
        this.more = more;
        this.update = update;

        this.chat = more.peer || false;
        this.from = more.from || false;

        this.BroadcastStore = {};

        this.Store = {
            message: {},
            user: {},
            channel: {},
            broadcast: {}
        }

    }

    get EntityList() {
        return [
            'mention', // @username
            'hashtag', // #hashtag) 
            'cashtag', // ($USD), 
            'bot_command', // /start@jobs_bot) 
            'url', // https://telegram.org 
            'email', // do-not-reply@telegram.org
            'phone_number', // +1-212-555-0123 
            'bold', // bold text
            'italic', // italic text
            'underline', // underlined text 
            'strikethrough', // strikethrough text 
            'code', // monowidth string 
            'pre', // monowidth block 
            'text_link', // for clickable text URLs
            'text_mention' // for users without usernames
        ]
    }

    fieldType(data) {
        if (!data) return false;
        let type = data.className == 'PeerUser' ? 'user' : 'channel';
        return {
            type,
            id: data[type + 'Id']
        }
    }

    entitiesMessage(entities) {
        this.broadcastStore('entities');
        let result = [];
        let typeEntity = (value) => value.className.replace('MessageEntity', '').toLowerCase()
            .replace(/texturl/i, 'text_link')
            .replace(/botcommand/i, 'bot_command')
            .replace(/phone/i, 'phone_number')
            .replace(/strike/i, 'strikethrough')
            .replace(/mentionname/i, 'text_mention')
            ;

        Object.entries(entities).forEach(([key, value]) => {
            let type = typeEntity(value);
            this.broadcastStore(type);
            result.push({
                type,
                offset: value.offset,
                length: value.length,
                url: value.url || false,
                user: value.userId ? { id: value.userId } : false,
            });
        });
        return result;
    }

    get getMe() {
        return this.userStore(this.more.me, true);
    }

    // ==========================================================================================

    broadcastStore() {
        if (arguments.length < 1) return;
        if (arguments.length < 1) return;

        Object.entries(arguments).forEach(([key, value]) => {
            this.Store.broadcast[value] = true;
        });
    }

    messageStore(data) {
        let id = data.id;

        let entities = data.entities ? this.entitiesMessage(data.entities) : false;
        let reply_to_message = data.replyTo?.replyToTopId ? { id: data.replyTo?.replyToTopId } : false;

        let message = {
            id,
            in: data.out ? false : true,
            out: data.out,

            date: data.date,
            edit_date: data.editDate,

            mentioned: data.mentioned,
            media: data.media ? this.mediaStore(data.media) : false,
            media_unread: data.mediaUnread,

            pinned: data.pinned,
            post_author: data.postAuthor,

            via_bot: data.viaBotId ? { id: data.viaBotId } : false,
            views: data.views,
            silent: data.silent,

            text: data.message,
            fromScheduled: data.fromScheduled,

            entities,
            reply_to_message,
        }
        this.Store.message[id] = message;
    }

    userStore(data, me = false) {
        let id = data.id;
        let user = {
            id,
            self: data.self,
            bot: data.bot,

            contact: data.contact,
            mutual_contact: data.mutualContact,
            verified: data.verified,
            restricted: data.restricted,
            min: data.min,

            bot_inline_geo: data.botInlineGeo,
            bot_chat_history: data.botChatHistory,
            bot_no_chats: data.botNochats,
            apply_min_photo: data.applyMinPhoto,

            support: data.support,
            scam: data.scam,
            fake: data.fake,
            // hash: fm.accessHash,

            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
            phone: data.phone,
        };
        if (me) return user;
        this.Store.user[id] = user;
    };

    channelStore(data) {
        let id = data.id;
        let channel = {
            id,
            type: data.className.toLowerCase(),
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
            verified: data.verified,
            title: data.title,
        };
        this.Store.channel[id] = channel;
    };

    store() {
        // users
        let users = this.update.users;
        users.forEach(data => this.userStore(data));

        // messages
        let messages = this.update.messages;
        messages.forEach(data => this.messageStore(data));

        // chats
        let channel = this.update.chats;
        channel.forEach(data => this.channelStore(data));
    }

    mediaStore(data) {
        this.broadcastStore('media');

        let type = data.className.replace('MessageMedia', '').toLowerCase();
        this.broadcastStore(type);

        let mime = data[type].mimeType;

        let bc = typeof mime == "string" ? mime.split('/') : false;
        if (bc) this.broadcastStore(...bc);

        if (/sticker/i.exec(data[type].mimeType)) this.broadcastStore('sticker');

        let result = {
            id: data[type].id?.value,
            type,
            date: data[type].date,
            size: data[type].size,
            mime_type: mime,
            dc: data[type].dcId
        }

        // result[type] = data[type];
        result.raw = data;

        return result;
    }

    get mainMessage() {
        let message = this.update.messages[0];
        return this.Store.message[message.id];
    }


    get context() {
        this.store();

        let broadcast = [];
        let messages = this.update.messages;

        // main messsage data
        let main = this.mainMessage;

        // from data
        let from = 'me';
        if (main.in) {
            let data = this.from || this.fieldType(messages[0].fromId);
            data = data || { type: 'user', id: messages[0]._senderId };
            if (data) {
                from = this.Store[data.type][data.id];
            }
        }

        // chat data
        let data = this.chat || this.fieldType(messages[0].peerId);
        let chat = this.Store[data.type][data.id];

        // reply data
        let reply_to_message = false;
        if (this.more.reply) {
            this.broadcastStore('reply');
            reply_to_message = this.Store.message[this.more.reply];
            if (reply_to_message.out) reply_to_message.from = 'me';
            if (reply_to_message.in) {
                let data = this.fieldType(messages[1].fromId);
                data = data || { type: 'user', id: messages[1]._senderId };
                if (data) {
                    reply_to_message.from = this.Store[data.type][data.id];
                }
            }
        }

        // forward data
        let forward_from = {}
        if (this.more.forward && this.more.forward?.id) {
            this.broadcastStore('forward');
            forward_from = {
                forward_from: this.Store[this.more.forward.type][this.more.forward.id]
            }
        }

        let result = {
            ...main,
            ...forward_from,
            reply_to_message,
            from,
            chat
        }

        result = removeNull(result);
        Object.entries(this.Store.broadcast).forEach(([key, value]) => broadcast.push(key));

        return {
            ...result,
            event: broadcast
        }
    }
}

module.exports = DuaMessage;