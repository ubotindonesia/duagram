const { Api } = require("telegram");

function Telegram(client) {
    this.client = client;
}

Telegram.prototype = {

    async invoke(data) {
        return await this.client.invoke(data);
    },

    getPeerId(ctx) {
        if (typeof ctx == 'number') {
            if (ctx < 0) {
                return parseInt(String(ctx).replace('-100', ''));
            }
            return ctx;
        }

        if (typeof ctx == 'string') return ctx;

        if (typeof ctx.message?.message?.peerId?.userId == 'number')
            return ctx.message?.peerId?.userId;

        if (typeof ctx.message?.peerId?.userId == 'number')
            return ctx.message?.peerId?.userId;

        if (typeof ctx.peerId?.userId == 'number')
            return ctx.peerId?.userId;

        if (typeof ctx.message?.message?.peerId?.channelId == 'number')
            return ctx.message?.peerId?.channelId;

        if (typeof ctx.message?.peerId?.channelId == 'number')
            return ctx.message?.peerId?.channelId;

        if (typeof ctx.peerId?.channelId == 'number')
            return ctx.peerId?.channelId;

        // letakkan akhir
        if (ctx.userId)
            if (typeof ctx.userId == 'number')
                return ctx.userId;

        if (ctx.channelId)
            if (typeof ctx.channelId == 'number')
                return ctx.channelId;

        return ctx;
    },

    async sendMessage(peer, text, more = {}) {
        let params = {
            peer: this.getPeerId(peer),
            message: text,
            ...more
        }

        if (more.parse_mode) {
            let parse_mode = more.parse_mode.toLowerCase();

            [parseText, entities] = await this.client._parseMessageText(text, parse_mode);
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

            [parseText, entities] = await this.client._parseMessageText(text, parse_mode);
            params.message = parseText;
            params.entities = entities;
            delete more.parse_mode;
        }

        return await this.invoke(new Api.messages.EditMessage(params));
    },

    async deleteMessages(peer, ids, revoke = true) {
        let peerID = this.getPeerId(peer);
        let type = await this.client.getEntity(peerID);
        let id = typeof ids == 'number' ? [ids] : ids;

        let data = type.className == "Channel"
            ? new Api.channels.DeleteMessages({ channel: peerID, id })
            : new Api.messages.DeleteMessages({ id, revoke });

        return await this.invoke(data);
    },

    async forwardMessages(peerFrom, peerTo, ids, more = {}) {
        let id = typeof ids == 'number' ? [ids] : ids;
        return await this.invoke(
            new Api.messages.ForwardMessages({
                fromPeer: this.getPeerId(peerFrom),
                toPeer: this.getPeerId(peerTo),
                id,
                ...more
            })
        )

    },

    async getMessages(peer, ids) {
        let peerID = this.getPeerId(peer);
        let type = await this.client.getEntity(peerID);
        let id = typeof ids == 'number' ? [ids] : ids;

        let data = type.className == "Channel"
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

    async deleteMessage(peer, ids, revoke = true) {
        return await this.deleteMessages(peer, ids, revoke = true);
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
        let type = await this.client.getEntity(peerID);

        let data = type.className == "Channel"
            ? new Api.channels.ReadHistory({ channel: peerID, ...more })
            : new Api.messages.ReadHistory({ peer: peerID, ...more });

        return await this.invoke(data);
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