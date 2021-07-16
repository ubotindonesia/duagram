const { duaGram } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "info", // none, error, warn, info, debug

    session: '' // Fill in the session here if you have one, or leave it blank 
});

// format date Time
bot.middleware((ctx, next) => {
    ctx.date_format = bot.Helper.dateFormat(ctx.date*1000, 'yyyy-MM-dd HH:mm:ss');
    next();
});

bot.middleware(async (ctx, next) => {
    ctx.hook = 'Something';
    next();
});

bot.cmd('check', async (ctx) => {
    console.log(ctx);
    return bot.sendMessage(ctx, `Accepted.\n\nHook message: ${ctx.hook}`, { replyToMsgId: ctx.id });
})