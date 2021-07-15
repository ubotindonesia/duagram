const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require('telegram/events');
const { Logger } = require("telegram/extensions");
const DuaCommand = require("./duacommand");
const input = require("input");
const { terminal, lessLog, moreLog } = require('../utils/log');
const { Api: ApiTelegram, Telegram } = require('./telegram');
const botApi = require('./botapi');
const Helper = require('../utils');


class DuaGram extends DuaCommand {
    constructor(options) {
        super();
        this.Api = ApiTelegram;
        this.init(options);
        terminal.less = lessLog;
        terminal.more = moreLog;
        this.terminal = terminal;
    }

    get tg() {
        return this.telegram;
    }

    async start() {
        this.startBanner();
        let {
            as_bot_api, bot_token,
            logDetail, logLevel,
            session, markRead,
            floodSleepThreshold, connectionRetries
        } = this.options;

        Logger.setLevel(logDetail);

        process.once('SIGINT', () => {
            terminal.warn("Terminating process..")
            process.exit(0)
        })
        process.once('SIGTERM', () => {
            terminal.warn("Terminating process..")
            process.exit(0)
        })

        const client = new TelegramClient(
            new StringSession(session),
            this.options.api_id,
            this.options.api_hash,
            {
                connectionRetries
            }
        );
        this.client = client;
        client.floodSleepThreshold = floodSleepThreshold;

        let as_bot_api_info;

        if (as_bot_api) {
            await client.start({
                botAuthToken: bot_token
            });
            this.BotApi = new botApi(bot_token);
            this.asBotApi = true;
            as_bot_api_info = 'BotAPI';
        } else {
            await client.start({
                phoneNumber: async () => await input.text('Phone number (628xxx):'),
                password: async () => await input.password('Password:'),
                phoneCode: async () => await input.text('OTP code:'),
                onError: (err) => terminal.error(err.message)
            });
            this.asBotApi = false;
            as_bot_api_info = 'userbot';

            terminal.log("This session:");
            console.log(client.session.save());
        }

        let tg = new Telegram(client);
        this.telegram = tg;

        let aboutMe = await this.getMe();
        this.storeMe(aboutMe);

        terminal.warn(`You login as [${as_bot_api_info}]`);
        terminal.info(this.aboutMe);

        terminal.info("I'm ready here, waiting for your activity...");

        // newMessage
        client.addEventHandler(async (ctx) => {
            let message = ctx.message;
            if (markRead && !as_bot_api) tg.readHistory(message);
            this.processMessage(ctx);
        }, new NewMessage({}));

        // raw
        client.addEventHandler(async (update) => {
            if (logLevel >= 1) {
                terminal.debug(`Event: ${update.className}`)
            }
            if (logLevel >= 2) {
                console.log(update);
            }
            this.emit('raw', update);
            this.emit(update.className, update);
        });
    }

    storeMe(data) {
        let aboutMe = new this.DuaMessage({}, { me: data }).getMe;
        let { id, bot, self, first_name, last_name, username } = aboutMe;
        this.me = {
            handle: data,
            long: aboutMe,
            short: { id, self, bot, first_name, last_name, username }
        }
    }

    get aboutMe() {
        let { first_name, last_name, username, phone } = this.me.long;
        let me = 'About me [name: ' + first_name;
        if (last_name) me += ' ' + last_name;
        me += ']'
        if (username) me += '[username: @' + username + '] ';
        if (phone) me += '[phone: +' + phone + '] ';
        return me;
    }

    async getMe(peer = false) {
        return await this.client.getMe(peer)
    }

    // alias
    async sendMessage(peer, text, more = {}) {
        return await this.telegram.sendMessage(peer, text, more);
    }

    async editMessage(peer, id, text, more = {}) {
        return await this.telegram.editMessage(peer, id, text, more);
    }

    async deleteMessages(peer, ids, revoke = true) {
        return await this.telegram.deleteMessages(peer, ids, revoke)
    }

    async deleteMessage(peer, ids, revoke = true) {
        return await this.telegram.deleteMessages(peer, ids, revoke)
    }

    async forwardMessages(peerFrom, peerTo, ids, more = {}) {
        return await this.telegram.forwardMessages(peerFrom, peerTo, ids, more);
    }

    async getMessages(peer, ids) {
        return await this.telegram.getMessages(peer, ids);
    }

    async getMessage(peer, ids) {
        return await this.telegram.getMessages(peer, ids);
    }

    async pinMessage(peer, id, more = {}) {
        return await this.telegram.pinMessage(peer, id, more);
    }

    async unpinAllMessages(peer) {
        return await this.telegram.unpinAllMessages(peer);
    }

    async getUserPhotos(peer, more = {}) {
        return await this.telegram.getUserPhotos(peer, more);
    }

    getPeerId(ctx) {
        return this.telegram.getPeerId(ctx);
    }

    async invoke(data) {
        return await this.telegram.invoke(data);
    }

    async editAdmin(peerChatId, peerUserId, more = {}) {
        return await this.telegram.editAdmin(peerChatId, peerUserId, more);
    }

    async editBanned(peerChatId, peerUserId, more = {}) {
        return await this.telegram.editBanned(peerChatId, peerUserId, more);
    }

    async getUserInfo(peer) {
        return await this.telegram.getUserInfo(peer);
    }

    async joinGroup(peer) {
        return await this.telegram.joinGroup(peer);
    }


    async sendFile(peer, file, more = {}) {
        return await this.telegram.sendFile(peer, file, more);
    }

    // end off DuaGram class
}

module.exports = {
    DuaGram, Helper, terminal, lessLog
}