const { duaGram, terminal } = require("duagram");
const { performance } = require('perf_hooks');

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',
    session: ''
});

bot.cmd('ping', async (ctx) => {
    let t0 = performance.now();
    let result = await bot.sendMessage(ctx.chat.id, 'Pong!');

    let t1 = performance.now();
    let diff = ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 });
    return bot.editMessage(ctx.chat.id, result.id || result.updates[0].id, `Pong!\nIn <code>${diff}</code> seconds.`, { parse_mode: 'html' })
        .catch(e => terminal.error(e.message));
});

bot.start();