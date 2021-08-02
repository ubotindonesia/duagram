const { duaGram, terminal } = require("..");

const bot = new duaGram({
    api_id: 123454,
    api_hash: 'your-api-hash',
    as_bot_api: true,
    bot_token: 'your-token-bot',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "info", // none, error, warn, info, debug 
});

bot.cmd('ping', (ctx) => {
    // bot.sendMessage(ctx, 'pong');
    return ctx.reply('pong!');
});

bot.start();
