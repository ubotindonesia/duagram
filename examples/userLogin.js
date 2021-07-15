const { duaGram, terminal } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "info", // none, error, warn, info, debug

    session: '' // Fill in the session here if you have one, or leave it blank 
});

// event all new message
bot.on('message', async (ctx, _ctx) => {
    terminal.debug('Ctx Legacy');
    console.log(_ctx);

    terminal.debug('Ctx Duagram');
    terminal.more(ctx);
});

bot.cmd('ping', async (ctx) => {
    bot.sendMessage(ctx, 'Pong!', { replyToMsgId: ctx.id });
});

bot.hear(/^(h+i+|h+e+l+o+)/i, (ctx) => {
    // message in only
    if (ctx.out) return;
    bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
});

bot.cmd('upload', (ctx) => {
    terminal.info('Starting upload...');
    let file = './photo.jpg';
    return bot.sendFile(ctx, file);
});

bot.cmd('version', (ctx) => {
    return bot.sendMessage(ctx, `<code>${JSON.stringify(bot.version, null, 2)}</code>`, { parse_mode: 'html' });
});

bot.start();
