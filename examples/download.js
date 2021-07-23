const { duaGram } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1,
    logDetail: "info", // none, error, warn, info, debug

    session: ''
});

bot.cmd('download', async (ctx, _ctx) => {
    if (!ctx.reply_to_message?.media) return ctx.reply('🤷🏽‍♂️ Please, reply to a message containing media.')
    let media = ctx.reply_to_message.media;

    let progressMessage = await bot.sendMessage(ctx, '⏳ Wait...', { replyToMsgId: ctx.id });
    let message_id = progressMessage.id || progressMessage.updates[0].id;

    // prevent flooding message
    // just update to every second
    let timer1 = Date.now();

    let progressCallback = (num) => {
        num = Math.round(num * 10000) / 100;
        if (num >= 100) return true;
        
        let timer2 = Date.now();
        let timer0 = timer2 - timer1;
        if (timer0 > 1000) {
            timer1 = timer2;
            return bot.editMessage(ctx, message_id, `⏳ Download .. <code>${num}</code> %`, { parse_mode: 'html' })
                .catch(e => bot.terminal.error(e.message));
        }
    };

    let result = await bot.downloadMedia(media.raw, {
        path: '.data',        
        progressCallback
    });

    return bot.editMessage(ctx, message_id, `✅ Done.\n\n📁 File name: <code>${result.path}/${result.file}</code>`, { parse_mode: 'html' })
});

bot.start();