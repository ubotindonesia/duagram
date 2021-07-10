const { duaGram, terminal, lessLog } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',
    as_bot_api: true,
    bot_token: 'your-token-bot',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "warn", // none, error, warn, info, debug
});

// event all new message
bot.on('message', async (ctx) => {
    // simple log
    lessLog(ctx);
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown' });
    }
});

bot.hear(/^(hi|hel+o+)/i, async (ctx) => {
    // lessLog(ctx);

    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
    }
});

bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './asset/2gram banner.jpg';
        let chat_id = bot.peerGetId(ctx);
        return bot.client.sendFile(chat_id, { file });
    }
});

bot.cmd('start', async (ctx) => {
    // message in only
    if (!ctx.out) {
        // if Bot API, send with Bot API can too
        if (bot.asBotApi) {
            let chat_id = bot.peerGetId(ctx);

            let reply_markup = JSON.stringify({
                inline_keyboard: [
                    [
                        Helper.Button.url('👥 uBotIndonesia', 'https://t.me/ubotindonesia')
                    ], [
                        Helper.Button.text('One', 'cb1'),
                        Helper.Button.text('Two', 'cb2')
                    ]
                ]
            });

            let more = {
                parse_mode: 'html',
                reply_markup
            }

            await bot.BotApi.sendMessage(chat_id, 'This message from <b>Bot Api</b>', more)
                .then(result => {
                    terminal.log('Result: BotApi sendMessage')
                    console.log(result);
                })
                .catch(error => terminal.error(error.message));

        }
    }
});

bot.start();
