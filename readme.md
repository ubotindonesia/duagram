## duaGram

Telegram Framework for userbot and or bot api.

![GitHub last commit](https://img.shields.io/github/last-commit/ubotindonesia/duagram) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/ubotindonesia/duagram) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ubotindonesia/duagram) ![GitHub issues](https://img.shields.io/github/issues/ubotindonesia/duagram) ![javascript](https://img.shields.io/badge/lang-javascript-red)


![duagram](https://github.com/ubotindonesia/duagram/raw/main/asset/2gram%20banner%20small.jpg)

### WARNING!

Use at Your Own Risk.

> I don't take any responsibility from actions made by you or on your account.

### Support

- [Issues](https://github.com/ubotindonesia/duagram/issues)

## Quick Start

### Install

`npm i duagram`

or

`yarn add duagram`

or

`pnpm add duagram`

## Simple

```javascript
const { duaGram } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash'
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown' });
    }
});

bot.start();
```

## More Example

> Do you need more example? Check this ...

### User Login

```javascript
const { duaGram, terminal, lessLog } = require("duagram");
const { performance } = require('perf_hooks');

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "none", // none, error, warn, info, debug

    // Fill in the session here if you have one, or leave it blank
    session: '', 

    // The most common error is the FloodWait error which is caused by calling a method multiple times in a short period and acts as a spam filter from telegram. So:
    floodSleepThreshold: 60, 

    // Mark message history as read
    markRead: true 
});

// event all new message
bot.on('message', async (ctx) => {
    // simple log
    lessLog(ctx);
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        let t0 = performance.now();
        let res = await bot.sendMessage(ctx, 'Pong!');
        let t1 = performance.now();
        let diff = '<code>' + ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 }) + "</code>"
        return await bot.editMessage(ctx, res.id, `Pong!\nIn ${diff} seconds.`, { parse_mode: 'html' });
    }
});

bot.hear(/^(hi|hel+o+)/i, async (ctx) => {
    // lessLog(ctx);

    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
    }
});

bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './asset/2gram banner.jpg';
        let chat_id = bot.peerGetId(ctx);
        return bot.client.sendFile(chat_id, { file });
    }
});

bot.start();
```

### Bot Login

```javascript
const { duaGram, terminal, lessLog } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',
    as_bot_api: true,
    bot_token: 'your-token-bot',

    logLevel: 1, // 0 false, 1 event, 2 detail
    logDetail: "warn", // none, error, warn, info, debug
});

// event all new message
bot.on('message', async (ctx) => {
    // simple log
    lessLog(ctx);
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown' });
    }
});

bot.hear(/^(hi|hel+o+)/i, async (ctx) => {
    // lessLog(ctx);

    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
    }
});

bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './asset/2gram banner.jpg';
        let chat_id = bot.peerGetId(ctx);
        return bot.client.sendFile(chat_id, { file });
    }
});

bot.cmd('start', async (ctx) => {
    // message in only
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
```

## Documentation

## duaGram

### Session

- Generator: [https://telegram.banghasan.com/ubotstring/](https://telegram.banghasan.com/ubotstring/)

### Peer

Definitions of object peer:

- message
- entity
- virtual class of user/channel
- string (username)
- number (chat_id)

#### Example:

- `sendMessage('me', 'hi');`
- `sendMessage('username', 'hi');`
- `sendMessage(213567634, 'hi');`
- `sendMessage(ctx, 'hi');`
- `sendMessage(ctx.message, 'hi');`
- `sendMessage(ctx.userID, 'hi');`

### Options

`const bot = new duaGram(options);`


| **Item**            | **Description**                                                | **Default** |
| --------------------- | ---------------------------------------------------------------- | ------------- |
| api\_id             | get it from[https://my.telegram.org](https://my.telegram.org/) |             |
| api\_hash           | get it from[https://my.telegram.org](https://my.telegram.org/) |             |
| session             | String session                                                 |             |
| logLevel            | Show log level 0 off, 1 event name, 2 detail                   | 1           |
| logDetail           | Event Detail (none, error, warn, info, debug)                  | debug       |
| as\_bot\_api        | Login as bot API? 0 false / 1 true                             | 0           |
| bot\_token          | Token Bot API[@botfahter](https://t.me/botfather)              |             |
| connectionRetries   | Connection Retry                                               | 3           |
| floodSleepThreshold | FloodWait error ? Set this                                     | 60          |
| markRead            | Mark message history as read                                   | TRUE        |

### Event

Default `command` prefix is `!/.`

Example:

```javascript
bot.cmd('ping', callback);
```

this for: `/ping`, `!ping`, or `.ping`

Available now:

- **cmd**(`string, callback, stop=true`)
- **hear**(`regex|string, callback, stop=true`)
- hears(`regex|string, callback, stop=true`) alias hear
- **command** alias `cmd`

### Signal On

Example:

```javascript
bot.on('raw', (ctx) => lessLog(ctx) );
```

Available:

- raw
- message
- media
- all class names in mtproto, according to the log details

Class name event example:

- UpdateNewMessage
- UpdateShortMessage
- UpdateReadHistoryOutbox
- UpdateDeleteMessages
- UpdateUserTyping
- etc... [schema](https://core.telegram.org/schema)

### Properties

Method or Accessors of duaGram.


| method    | description                                                       |
| ----------- | ------------------------------------------------------------------- |
| telegram  | collection function duagram                                       |
| Api       | access for[API Telegram](https://core.telegram.org/)              |
| client    | client connecton                                                  |
| BotApi    | wrapper for[Bot Api Telegram](https://core.telegram.org/bots/api) |
| terminal  | console replacement for colorful and bettermore                   |
| lessLog   | better than`console.log` function, less prefix \_ field           |
| asBotApi  | `true`/`false`                                                    |
| version   | duagrams version info                                             |
| cmdPrefix | default is`.!/`                                                   |

Example:

```javascript
const bot = new duaGram({...});

bot.cmdPrefix = '~'; // bot.cmd('ping', ..) => ~ping
console.log(bot.version);

```

#### Alias

- tg (alias `telegram`)
- sendMessage (alias `tg.sendMessage`)
- editMessage(`peer, ids, text, more`)
- deleteMessages(`peer, ids, more`)
- deleteMessage(`peer, ids, more`) alias
- invoke (alias `tg.invoke`)
- peerGetId(ctx)

## Telegram

### method

- invoke(`params`)
- peerGetId(`ctx`)
- sendMessage(`peer, text, more`)
- editMessage(`peer, id, text, more`)
- deleteMessages(`peer, ids, more`)
- readHistory(`peer, more`)

## client

### Method

- start()
- checkAuthorization()
- signInUser()
- signInUserWithQrCode()
- signInWithPassword()
- inlineQuery()
- buildReplyMarkup()
- downloadFile()
- downloadProfilePhoto()
- downloadMedia()
- setParseMode()
- iterMessages()
- getMessages()
- sendMessage()
- forwardMessages()
- editMessage()
- iterDialogs()
- getDialogs()
- iterParticipants()
- getParticipants()
- removeEventHandler()
- listEventHandlers()
- uploadFile()
- sendFile()
- invoke()
- getMe()
- isBot()
- isUserAuthorized()
- getInputEntity()
- getPeerId()
- connect()
- getDC()
- disconnect()
- destroy()
- ... etc

## Ref

- [API Telegram](https://core.telegram.org/)
- [Schema](https://core.telegram.org/schema)
- [Bot API Telegram](https://core.telegram.org/bots/api)
- [GramJS](https://gram.js.org/)
- [GramJS Beta](https://gram.js.org/beta/classes/client_telegramclient.telegramclient.html)
- [GramJS Gitbook](https://painor.gitbook.io/gramjs/)
- [Bot Api Example](https://core.telegram.org/bots/samples)
- [NodeJS](https://nodejs.org/dist/latest/docs/api/)
- [MDN Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [VS Codium](https://vscodium.com/)

## Last Words

If you are Indonesian, let's join the [@ubotindonesia](https://t.me/ubotindonesia) telegram group.

### Happy nge-bot!

_see you again_ ^^
