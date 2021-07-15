require("dotenv").config({ path: '.env' })

let options = {
    api_id: parseInt(process.env.API_ID) || 0,
    api_hash: process.env.API_HASH || '',
    session: process.env.STRING_SESSION || '',

    logLevel: 1, // show log for dev: 0 - false, 1 - event, 2 - detail
    logDetail: process.env.LOG_DETAIL || "info", // none, error, warn, info, debug

    as_bot_api: parseInt(process.env.AS_BOT_API) || false, // boelan
    bot_token: process.env.BOT_TOKEN || '', // boelan

    connectionRetries: 3,
    floodSleepThreshold: 180, // The most common error is the FloodWait error which is caused by calling a method multiple times in a short period and acts as a spam filter from telegram.

    markRead: true  // Mark message history as read
}

// console.log(options);

module.exports = options;