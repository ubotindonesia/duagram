const { Api } = require("telegram");
// const { Util } = require("../Utils/util");

function Telegram(client) {
    this.client = client;
}

Telegram.prototype = {

    async invoke(data) {
        return await this.client.invoke(data);
    },

    peerGetId(ctx) {
        if (typeof ctx == 'number' || typeof ctx == 'string') return ctx;

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
            peer: this.peerGetId(peer),
            message: text
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

    async deleteMessages(peer, ids, revoke = true) {
        let peerID = this.peerGetId(peer);
        let type = await this.client.getEntity(peerID);

        let id = typeof ids == 'number' ? [ids] : ids;
        let data = type.className == "Channel"
            ? new Api.channels.DeleteMessages({ channel: peerID, id })
            : new Api.messages.DeleteMessages({ id, revoke });

        return await this.invoke(data);
    },

    async editMessage(peer, id, text, more) {
        let params = { peer: this.peerGetId(peer), id }

        if (more.parse_mode) {
            let parse_mode = more.parse_mode.toLowerCase();

            [parseText, entities] = await this.client._parseMessageText(text, parse_mode);
            params.message = parseText;
            params.entities = entities;
            delete more.parse_mode;
        }

        return await this.invoke(new Api.messages.EditMessage(params));
    },

    async deleteMessage(peer, ids, revoke = true) {
        return await this.deleteMessages(peer, ids, revoke = true);
    },


    async readHistory(peer, more = {}) {
        let peerID = this.peerGetId(peer);
        let type = await this.client.getEntity(peerID);

        let data = type.className == "Channel"
            ? new Api.channels.ReadHistory({ channel: peerID, ...more })
            : new Api.messages.ReadHistory({ peer: peerID, ...more });

        return await this.invoke(data);
    },


    // end of prototype
}

module.exports = {
    Api,
    Telegram
}