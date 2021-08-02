const { duaGram } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',
    session: '',
    local: true,
    session_name: 'data_my_bot' // optional
});

bot.on('connected', () => {
    bot.sendMessage(213567634, 'test pertamax');
})

bot.start();