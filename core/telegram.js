const { Api } = require("telegram");
const { CustomFile } = require("telegram/client/uploads");
const { _parseMessageText } = require("telegram/client/messageParse")
const getPeerId = require('../utils/peer');
const BigInt = require("big-integer");

const fs = require('fs');
const FileType = require('file-type');

function Telegram(client) {
    this.client = client;
    this.getPeerId = getPeerId;
}

Telegram.prototype = {

    async invoke(data) {
        return await this.client.invoke(data);
    },

    async isChannel(peer) {
        let peerID = this.getPeerId(peer);
        let type = await this.client.getEntity(peerID);
        return Boolean(type.className == "Channel");
    },

    async sendMessage(peer, text, more = {}) {
        let params = {
            peer: this.getPeerId(peer),
            randomId: this.randomId(),
            message: text,
            ...more
        }

        if (more.parse_mode) {
            let parse_mode = more.parse_mode.toLowerCase();

            let [parseText, entities] = await _parseMessageText(this.client, text, parse_mode);
            params.message = parseText;
            params.entities = entities;
            delete more.parse_mode;
        }
        return await this.invoke(new Api.messages.SendMessage(params));
    },

    async editMessage(peer, id, text, more) {
        let params = { peer: this.getPeerId(peer), id, ...more }

        if (more.parse_mode) {
            let parse_mode = more.parse_mode.toLowerCase();

            [parseText, entities] = await _parseMessageText(this.client, text, parse_mode);
            params.message = parseText;
            params.entities = entities;
            delete more.parse_mode;
        }

        return await this.invoke(new Api.messages.EditMessage(params));
    },

    async deleteMessages(peer, ids, revoke = true) {
        let peerID = this.getPeerId(peer);
        let id = typeof ids == 'number' ? [ids] : ids;

        let data = await this.isChannel(peer)
            ? new Api.channels.DeleteMessages({ channel: peerID, id })
            : new Api.messages.DeleteMessages({ id, revoke });

        return await this.invoke(data);
    },

    async deleteMessage(peer, ids, revoke = true) {
        return await this.deleteMessages(peer, ids, revoke = true);
    },

    async forwardMessages(peerFrom, peerTo, ids, more = {}) {
        let id = typeof ids == 'number' ? [ids] : ids;
        return await this.invoke(
            new Api.messages.ForwardMessages({
                fromPeer: this.getPeerId(peerFrom),
                toPeer: this.getPeerId(peerTo),
                randomId: this.randomId(),
                id,
                ...more
            })
        )
    },

    async getMessages(peer, ids) {
        let peerID = this.getPeerId(peer);
        let id = typeof ids == 'number' ? [ids] : ids;

        let data = await this.isChannel(peer)
            ? new Api.channels.GetMessages({ channel: peerID, id })
            : new Api.messages.GetMessages({ id });

        return await this.invoke(data);
    },

    async pinMessage(peer, id, more = {}) {
        return await this.invoke(
            new Api.messages.UpdatePinnedMessage({
                userId: this.getPeerId(peer), id,
                ...more
            })
        )
    },

    async unpinAllMessages(peer) {
        return await this.invoke(
            new Api.messages.UnpinAllMessages({
                userId: this.getPeerId(peer), id
            })
        )
    },

    async getUserPhotos(peer, more = {}) {
        return await this.invoke(
            new Api.photos.GetUserPhotos({
                userId: this.getPeerId(peer),
                ...more
            })
        )
    },

    async readHistory(peer, more = {}) {
        let peerID = this.getPeerId(peer);

        let data = await this.isChannel(peer)
            ? new Api.channels.ReadHistory({ channel: peerID, ...more })
            : new Api.messages.ReadHistory({ peer: peerID, ...more });

        return await this.invoke(data);
    },

    async deleteHistory(peer, more = {}) {
        let peerID = this.getPeerId(peer);

        let data = await this.isChannel(peer)
            ? new Api.channels.DeleteHistory({ channel: peerID, ...more })
            : new Api.messages.DeleteHistory({ peer: peerID, ...more });

        return await this.invoke(data);
    },

    async deleteUserHistory(channelId, userId) {
        return await client.invoke(
            new this.Api.channels.DeleteUserHistory({
                channel: channelId,
                userId: userId
            })
        )
    },

    async readMentions(peer) {
        return await this.invoke(
            new Api.messages.ReadMentions({
                peer: this.getPeerId(peer)
            })
        )
    },

    async readMessageContents(ids) {
        let id = typeof ids == 'number' ? [ids] : ids;

        return await this.invoke(
            new Api.messages.ReadMessageContents({ id })
        )
    },

    async editAdmin(peerChatId, peerUserId, more = {}) {
        let permissions = {
            changeInfo: more?.changeInfo || true,
            postMessages: more?.postMessages || true,
            editMessages: more?.editMessages || true,
            deleteMessages: more?.deleteMessages || true,
            banUsers: more?.banUsers || true,
            inviteUsers: more?.inviteUsers || true,
            pinMessages: more?.pinMessages || true,
            addAdmins: more?.addAdmins || false,
            anonymous: more?.anonymous || false,
            manageCall: more?.manageCall || true
        }
        return await this.invoke(
            new Api.channels.EditAdmin({
                channel: this.getPeerId(peerChatId),
                userId: this.getPeerId(peerUserId),
                adminRights: new Api.ChatAdminRights(permissions),
                rank: more?.rank || ""
            })
        )
    },

    async editBanned(peerChatId, peerUserId, more = {}) {
        let permissions = {
            untilDate: more?.untilDate || 0,
            viewMessages: more?.viewMessages || true,
            sendMessages: more?.sendMessages || true,
            sendMedia: more?.sendMedia || true,
            sendStickers: more?.sendStickers || true,
            sendGifs: more?.sendGifs || true,
            sendGames: more?.sendGames || true,
            sendInline: more?.sendInline || true,
            sendPolls: more?.sendPolls || true,
            changeInfo: more?.changeInfo || true,
            inviteUsers: more?.inviteUsers || true,
            pinMessages: more?.pinMessages || true
        }
        return await this.invoke(
            new Api.channels.EditBanned({
                channel: this.getPeerId(peerChatId),
                participant: this.getPeerId(peerUserId),
                bannedRights: new Api.ChatBannedRights(permissions)
            })
        )

    },

    async getUserInfo(peer) {
        return await this.invoke(new Api.help.GetUserInfo({ userId: this.getPeerId(peer) }));
    },

    async joinGroup(peer) {
        return await this.invoke(new Api.channels.JoinChannel({ channel: this.getPeerId(peer), }))
    },

    // still not final
    async downloadMedia(media_data, more = {}) {
        let path = more.path || '.';

        let buffer = await this.client.downloadMedia(media_data, { workers: 1, ...more })
        let fileType = await FileType.fromBuffer(buffer);

        let file_name = more.file_name || Date.now() + '.' + fileType.ext;

        try {
            fs.writeFileSync(path + '/' + file_name, buffer);
            return {
                status: true,                
                file: file_name,
                path
            }
        } catch (error) {
            return {
                status: false,
                message: error.message
            }
        }
    },

    randomId() {
        return BigInt(-Math.floor(Math.random() * 10000000000000));
    },


    async sendFile(peer, file, more = {}) {
        return await this.client.sendFile(
            this.getPeerId(peer),
            {
                file,
                ...more
            }
        );
    },

    // end of prototype
}

module.exports = {
    Api,
    Telegram
}