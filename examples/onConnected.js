const { duaGram } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',
    session: ''
});

bot.on('connected', () => {
    bot.sendMessage(213567634, 'test pertamax');
})

bot.start();