const { TelegramClient } = require("telegram");
const { NewMessage } = require('telegram/events');
const { Logger } = require("telegram/extensions");
const DuaCommand = require("./duacommand");
const input = require("input");

const { Api: ApiTelegram, Telegram } = require('./telegram');
const botApi = require('./botapi');
const Helper = require('../utils');


class DuaGram extends DuaCommand {
    constructor(options) {
        super();
        this.options = options;
        this.Api = ApiTelegram;
        this.Helper = Helper;
        this.init(options);
    }

    get tg() {
        return this.telegram;
    }

    async start() {
        this.startBanner();
        let {
            as_bot_api, bot_token,
            logDetail, logLevel, markRead,
            floodSleepThreshold, connectionRetries
        } = this.options;

        Logger.setLevel(logDetail);

        process.once('SIGINT', async () => {
            await this.client.disconnect();
            this.terminal.warn("Terminating process..");
            process.exit(0)
        })
        process.once('SIGTERM', async () => {
            await this.client.disconnect();
            this.terminal.warn("Terminating process..");
            process.exit(0)
        })

        let session = await this.makeSession();

        const client = new TelegramClient(
            session,
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
                onError: (err) => this.terminal.error(err.message)
            });
            this.asBotApi = false;
            as_bot_api_info = 'userbot';

            this.terminal.log("This session:");
            console.log(client.session.save());
        }

        let tg = new Telegram(client);
        this.telegram = tg;

        let aboutMe = await this.getMe();
        this.storeMe(aboutMe);

        this.terminal.warn(`You login as [${as_bot_api_info}]`);
        this.terminal.warn(`Store mode: ${this.session_type}`);
        this.terminal.info(this.aboutMe);

        this.terminal.info("I'm ready here, waiting for your activity...");

        this.emit('connected', aboutMe);

        // newMessage
        client.addEventHandler(async (ctx) => {
            let message = ctx.message;
            if (markRead && !as_bot_api) tg.readHistory(message);
            this.processMessage(ctx);
        }, new NewMessage({}));

        // raw
        client.addEventHandler(async (update) => {
            if (logLevel >= 1) {
                if (update.className) this.terminal.debug(`Event: ${update.className}`)
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

    // end off DuaGram class
}

module.exports = {
    DuaGram
}