const { terminal, duaGram } = require("..");
const { performance } = require('perf_hooks');
let options = require('./config');

let LoginAsBotApi = false;

if (LoginAsBotApi) {
    options.as_bot_api = true;
    options.session = '';
}

const bot = new duaGram(options);

const Helper = bot.Helper

bot.on('message', async (ctx, ori) => {
    terminal.less(ctx);
});

/* bot.on('message', async (ctx) => {
    console.log(ctx);
}); */

bot.middleware(async (ctx, next) => {
    // ctx.message: `Hooked: ${text}`
    ctx.hook = {
        session: 'any something'
    };
    next();
});

bot.on('media', () => terminal.warn('Media!'));

bot.cmd('check', async (ctx) => {
    terminal.debug('Hooked Message:')
    terminal.less(ctx);
    return bot.sendMessage(ctx, `Accepted.\n\n${ctx.hook.session}`, { replyToMsgId: ctx.id, parse_mode: 'markdown' });

})

bot.cmd('profile', async (ctx) => {
    let a = await bot.tg.invoke(new bot.Api.photos.GetUserPhotos({ userId: ctx.fromId.userId }));
    console.log(a);
});


bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './asset/2gram banner.jpg';
        return bot.sendFile(ctx, file);
    }
});

bot.cmd('ping', async (ctx) => {
    if (!ctx.out) {
        let t0 = performance.now();
        let res = await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown', replyToMsgId: ctx.id });
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
    // message in only
    if (!ctx.out) {

        if (!bot.asBotApi) {
            return bot.sendMessage(ctx, "I'm not bot api 😅")
        }

        // if Bot API, send with Bot API can too

        let chat_id = bot.getPeerId(ctx);

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
});

bot.start();