const { terminal, duaGram } = require("..");

let options = require('./config');

let LoginAsBotApi = true;

if (LoginAsBotApi) {
    options.as_bot_api = true;
    options.session = '';
}

const bot = new duaGram(options);

bot.cmd('ping', (ctx) => {
    bot.sendMessage(ctx.chat.id, 'pong!')
})


bot.cmd('start', async (ctx) => {
    // message in only
    if (ctx.out) return false;

    if (!bot.asBotApi) {
        return bot.sendMessage(ctx, "I'm not bot api 😅")
    }

    // if Bot API, send with Bot API can too
    let reply_markup = JSON.stringify({
        inline_keyboard: [
            [
                bot.Helper.Button.url('👥 uBotIndonesia', 'https://t.me/ubotindonesia')
            ], [
                bot.Helper.Button.text('One', 'cb1'),
                bot.Helper.Button.text('Two', 'cb2')
            ]
        ]
    });

    let more = {
        parse_mode: 'html',
        reply_markup
    }

    return bot.BotApi.sendMessage(ctx.chat.id, 'This message from <b>Bot Api</b>', more)
        .then(result => {
            terminal.log('Result: BotApi sendMessage')
            console.log(result);
        })
        .catch(error => terminal.error(error.message));



});

bot.start();