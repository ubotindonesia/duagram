const { lessLog, terminal, duaGram, Helper } = require("..");
const { performance } = require('perf_hooks');
let options = require('./config');

let LoginAsBotApi = false;

if (LoginAsBotApi) {
    options.as_bot_api = true;
    options.session = '';
}

const bot = new duaGram(options);

/* bot.on('message', async (ctx) => {
    lessLog(ctx);
}); */

/* bot.on('raw', async (ctx) => {
    console.log(ctx);
}); */

bot.middleware((ctx, next) => {
    ctx.additional = 'message test from middleware';
    next();
});

bot.cmd('plus', async (ctx) => {
    if (!ctx.out)
        return bot.sendMessage(ctx, `Hooked: ${ctx.additional}`);
})

bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './asset/2gram banner.jpg';
        let chat_id = bot.peerGetId(ctx);
        return bot.client.sendFile(chat_id, { file });
    }
});

bot.cmd('ping', async (ctx) => {
    if (!ctx.out) {
        let t0 = performance.now();
        let res = await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown' });
        let t1 = performance.now();
        let diff = '<code>' + ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 }) + "</code>"
        return bot.editMessage(ctx, res.id, `Pong!\nIn ${diff} seconds.`, { parse_mode: 'html' });
    }
});

bot.cmd('delete', async (ctx) => {
    if (!ctx.out) {
        await bot.deleteMessages(ctx, ctx.id)
    }
});

bot.cmd('version', (ctx) => {
    if (!ctx.out) {
        return bot.sendMessage(ctx, `<code>${JSON.stringify(bot.version, null, 2)}<code>`, { parse_mode: 'HTML' });
    }
});

bot.cmd('start', async (ctx) => {
    // reply just message in
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