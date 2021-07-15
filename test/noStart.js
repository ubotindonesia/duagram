const { lessLog, terminal, duaGram, Helper } = require("..");
let options = require('./config');
let result = {};

const bot = new duaGram(options);

bot.middleware(async (ctx, next) => {
    ctx.hooked = 'this is new message';
    next();

});

bot.hear('hi', (ctx) => {
    return bot.sendMessage(ctx.chat.id, 'Hi too..', { replyToMsgId: ctx.id });
})

result.scanners = bot.scanners;
result.middleware = bot.middleware;
result.version = bot.version;



terminal.debug('Result noStartBot');
console.log(result);