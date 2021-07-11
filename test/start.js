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

bot.on('message', async (ctx) => {
    terminal.less(ctx);
});

/* bot.on('message', async (ctx) => {
    console.log(ctx);
}); */

bot.middleware(async (ctx, next) => {
    if (ctx.replyTo) {
        ctx.detailReplyTo = await bot.getMessages(ctx, ctx.replyTo.replyToMsgId);
        next();
    }
});

bot.cmd('check', async (ctx) => {
    if (ctx.detailReplyTo) {
        terminal.debug('Result Detail Message Reply:')
        terminal.less(ctx.detailReplyTo);
        return bot.sendMessage(ctx, `Accepted!`);
    }
})
/* 
bot.cmd('cek', async (ctx) => {
    if (!ctx.out) {
        let r = await bot.getMessage(ctx, 378);
        console.log(r);
        return bot.sendMessage(ctx, `Accepted.`, { replyToMsgId: ctx.id });
    }
}) */

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