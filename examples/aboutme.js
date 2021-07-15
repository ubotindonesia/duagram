const { duaGram, terminal } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, 
    logDetail: "info", // none, error, warn, info, debug

    session: ''
});

bot.cmd('me', (ctx) => {
    bot.sendMessage(ctx.chat.id, JSON.stringify(bot.me.long, null, 2));
});

bot.start();