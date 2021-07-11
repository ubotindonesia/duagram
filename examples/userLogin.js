const { duaGram, terminal } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "warn", // none, error, warn, info, debug

    session: '' // Fill in the session here if you have one, or leave it blank 
});

// event all new message
bot.on('message', async (ctx) => {
    // simple log
    terminal.less(ctx);
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown' });
    }
});

bot.hear(/^(hi|hel+o+)/i, async (ctx) => {
    // terminal.less(ctx);

    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
    }
});

bot.cmd('version', (ctx) => {
    if (!ctx.out) {
        return bot.sendMessage(ctx, `<code>${JSON.stringify(bot.version, null, 2)}<code>`, { parse_mode: 'HTML' });
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

bot.start();
