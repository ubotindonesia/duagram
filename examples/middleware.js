const { duaGram, terminal } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "info", // none, error, warn, info, debug

    session: '' // Fill in the session here if you have one, or leave it blank 
});

bot.middleware(async (ctx, next) => {
    ctx.hook = 'Something';
    next();
});

bot.cmd('check', async (ctx) => {
    terminal.debug('Hooked!')
    return bot.sendMessage(ctx.chat.id, `Accepted.\n\nHook message: ${ctx.hook}`, { replyToMsgId: ctx.id });
})