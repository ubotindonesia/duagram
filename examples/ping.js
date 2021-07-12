const { duaGram, terminal } = require("duagram");
const { performance } = require('perf_hooks');

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "warn", // none, error, warn, info, debug

    session: '' // Fill in the session here if you have one, or leave it blank 
});

bot.cmd('ping', async (ctx) => {
    let t0 = performance.now();
    let result = await bot.sendMessage(ctx, 'Pong!');

    //terminal.less(result);
    let chat_id, message_id;
    if (result.updates) {
        chat_id = result.chats[0].id;
        message_id = result.updates[0].id
    } else {
        chat_id = ctx;
        message_id = result.id;
    }
    let t1 = performance.now();
    let diff = ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 });
    bot.editMessage(chat_id, message_id, `Pong!\nIn <code>${diff}</code> seconds.`, { parse_mode: 'html' }).catch(e => terminal.error(e.message));
});
