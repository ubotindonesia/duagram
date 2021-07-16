const { duaGram, terminal } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',
    as_bot_api: true,
    bot_token: 'your-token-bot',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "info", // none, error, warn, info, debug
});

// event all new message
bot.on('message', async (ctx, _ctx) => {

    terminal.debug('Ctx Legacy');
    console.log(_ctx);

    terminal.debug('Ctx Duagram');
    console.log(ctx);
});

bot.cmd('ping', async (ctx) => {
    bot.sendMessage(ctx, 'Pong!', { replyToMsgId: ctx.id });
});

bot.cmd('upload', async (ctx) => {
    terminal.info('Starting upload...');
    let file = './photo.jpg';
    return bot.sendFile(ctx, file);

});

// bot API Telegram
bot.cmd('start', async (ctx) => {
    // message in only
    if (ctx.out) return false;

    if (!bot.asBotApi) {
        return bot.sendMessage(ctx, "I'm not bot api 😅")
    }

    let chat_id = ctx.chat.id;
    if (ctx.chat.type == 'channel') {
        chat_id = bot.Helper.chat.to_api(chat_id);
    }

    // if Bot API, send with Bot API can too
    let reply_markup = JSON.stringify({
        inline_keyboard: [
            [
                bot.Helper.Button.url('👥 uBotIndonesia', 'https://t.me/ubotindonesia')
            ], [
                bot.Helper.Button.text('One', 'cb1'),
                bot.Helper.Button.text('Two', 'cb2')
            ]
        ]
    });

    let more = {
        parse_mode: 'html',
        reply_markup
    }

    return bot.BotApi.sendMessage(chat_id, 'This message from <b>Bot Api</b>', more)
        .then(result => {
            terminal.log('Result: BotApi sendMessage')
            console.log(result);
        })
        .catch(error => terminal.error(error.message));
});

bot.cmd('version', (ctx, _ctx) => {
    let telegram = 'Telegram Client: v' + _ctx._client.__version__;
    return bot.sendMessage(ctx, `${telegram}\n\n<code>${JSON.stringify(bot.version, null, 2)}</code>`, { parse_mode: 'HTML' });
});

bot.start();
