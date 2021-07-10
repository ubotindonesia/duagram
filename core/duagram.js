const DuaEvent = require('./duaevent');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require('telegram/events');
const { Logger } = require("telegram/extensions");
const input = require("input");
const { terminal, fileLog, lessLog } = require('../utils/log');
const { Api: ApiTelegram, Telegram } = require('./telegram');
const botApi = require('./botapi');

class DuaGram extends DuaEvent {
    constructor(options) {
        super();
        this.Api = ApiTelegram;
        this.init(options);
        this.terminal = terminal;
        this.lessLog = lessLog;
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
        }
        terminal.warn(`You login as [${as_bot_api_info}]`)
        let tg = new Telegram(client);
        this.telegram = tg;
        
        let loggedSession = client.session.save();
        terminal.log("This session:");        
        console.log(loggedSession);
        if(!loggedSession) {
            terminal.error("Cannot operate.");
            process.exit();
        }

        terminal.info("I'm ready here, waiting for your activity...");

        // newMessage
        client.addEventHandler(async (ctx) => {
            let message = ctx.message;
            if (markRead && !as_bot_api)
                await tg.readHistory(message);
            this.emit('message', message);

            if (ctx.media) this.emit('media', ctx);
            if (ctx.message) {
                this.scanningText(message);
            }

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

    // alias
    async sendMessage(peer, text, more = {}) {
        return await this.telegram.sendMessage(peer, text, more);
    }

    async editMessage(peer, id, text, more) {
        return await this.telegram.editMessage(peer, id, text, more);
    }

    async deleteMessages(peer, ids, revoke = true) {
        return await this.telegram.deleteMessages(peer, ids, revoke = true)
    }

    async deleteMessage(peer, ids, revoke = true) {
        return await this.telegram.deleteMessages(peer, ids, revoke = true)
    }

    peerGetId(ctx) {
        return this.telegram.peerGetId(ctx);
    }

}

module.exports = {
    DuaGram, terminal, lessLog
}