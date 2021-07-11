## duaGram

Telegram Framework for userbot and or bot api, using nodejs.

![GitHub last commit](https://img.shields.io/github/last-commit/ubotindonesia/duagram) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/ubotindonesia/duagram) ![npm](https://img.shields.io/npm/v/duagram) ![node-current](https://img.shields.io/node/v/duagram?color=red) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ubotindonesia/duagram?color=fef) ![GitHub repo size](https://img.shields.io/github/repo-size/ubotindonesia/duagram?color=fee) ![Lines of code](https://img.shields.io/tokei/lines/github/ubotindonesia/duagram?color=dee) ![GitHub top language](https://img.shields.io/github/languages/top/ubotindonesia/duagram?color=dee)  ![GitHub all releases](https://img.shields.io/github/downloads/ubotindonesia/duagram/total) ![GitHub Discussions](https://img.shields.io/github/discussions/ubotindonesia/duagram) ![npm](https://img.shields.io/npm/dt/duagram?color=blue) ![GitHub pull requests](https://img.shields.io/github/issues-pr/ubotindonesia/duagram) ![GitHub issues](https://img.shields.io/github/issues/ubotindonesia/duagram) 


![duagram](https://github.com/ubotindonesia/duagram/raw/main/asset/2gram%20banner%20small.jpg)


![GitHub watchers](https://img.shields.io/github/watchers/ubotindonesia/duagram?style=social) ![GitHub forks](https://img.shields.io/github/forks/ubotindonesia/duagram?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/ubotindonesia/duagram?style=social) 

### WARNING!

Use at Your Own Risk.

> I don't take any responsibility from actions made by you or on your account.

### History

- [Release](https://github.com/ubotindonesia/duagram/releases)

### Support

- [Issues](https://github.com/ubotindonesia/duagram/issues)
- Contributor are welcome...

## Start

### Install

`npm i duagram`

or

`yarn add duagram`

or

`pnpm add duagram`

## Quick Start

```javascript
const { duaGram } = require("duagram");

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash'
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown' });
    }
});

bot.start();
```

## API TELEGRAM

To use the duaGram, you first have to get API ID dan API HASH.

Get it from [https://my.telegram.org](https://my.telegram.org)


### Token Bot

If you connect use Bot API, get a bot account by chatting with [BotFather](https://core.telegram.org/bots#6-botfather).

BotFather will give you a token, something like `123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ`.


## More Example

> Do you need more example? Check this ...

### User Login

```javascript
const { duaGram, terminal } = require("duagram");
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
    terminal.less(ctx);
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        let t0 = performance.now();
        let res = await bot.sendMessage(ctx, 'Pong!', { replyToMsgId: ctx.id });
        let t1 = performance.now();
        let diff = '<code>' + ((t1 - t0) / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 }) + "</code>"
        return await bot.editMessage(ctx, res.id, `Pong!\nIn ${diff} seconds.`, { parse_mode: 'html' });
    }
});

bot.hear(/^(hi|hel+o+)/i, async (ctx) => {
    // terminal.less(ctx);

    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
    }
});

bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './photo.jpg';
        return bot.sendFile(ctx, file);
    }
});

bot.start();
```

### Bot Login

```javascript
const { duaGram, terminal, Helper } = require("duagram");

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
    terminal.less(ctx);
});

bot.cmd('ping', async (ctx) => {
    // message in only
    if (!ctx.out) {
        return await bot.sendMessage(ctx, '**Pong**!', { parse_mode: 'markdown', replyToMsgId: ctx.id });
    }
});

bot.hear(/^(hi|hel+o+)/i, async (ctx) => {
    // terminal.less(ctx);

    // message in only
    if (!ctx.out) {
        await bot.sendMessage(ctx, '<i>Hi, too!</i>', { parse_mode: 'html' });
    }
});

bot.cmd('upload', async (ctx) => {
    if (!ctx.out) {
        terminal.info('Starting upload...');
        let file = './photo.jpg';
        return bot.sendFile(ctx, file);
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
```

## Documentation

## duaGram

### Session

- Generator: [https://telegram.banghasan.com/ubotstring/](https://telegram.banghasan.com/ubotstring/)

### Peer

Definitions of object peer:

- message
- entity
- virtual class of user/channel (object)
- string (username)
- number (userID / peerId)
- number (Bot API style) like `-1001588206363`

#### Example:

- `sendMessage('me', 'hi');`
- `sendMessage('username', 'hi');`
- `sendMessage(213567634, 'hi');`
- `sendMessage(-1001588206363, 'hi');` // Bot API Style
- `sendMessage(ctx, 'hi');`
- `sendMessage(ctx.message, 'hi');` // if `ctx.message` is object, not string
- `sendMessage(ctx.userId, 'hi');` // if `ctx.userID` is object, not number
- `sendMessage(ctx.peerId, 'hi');` 

### Options

`const bot = new duaGram(options);`


| **Item**            | **Description**                                                | **Default** |
| --------------------- | ---------------------------------------------------------------- | ------------- |
| api\_id             | get it from [https://my.telegram.org](https://my.telegram.org/) |             |
| api\_hash           | get it from [https://my.telegram.org](https://my.telegram.org/) |             |
| session             | String session                                                 |             |
| logLevel            | Show log level 0 off, 1 event name, 2 detail                   | 1           |
| logDetail           | Event Detail (none, error, warn, info, debug)                  | debug       |
| as\_bot\_api        | Login as bot API? 0 false / 1 true                             | 0           |
| bot\_token          | Token Bot API [@botfahter](https://t.me/botfather)             |             |
| connectionRetries   | Connection Retry                                               | 3           |
| floodSleepThreshold | FloodWait error ? Set this                                     | 60          |
| markRead            | Mark message history as read                                   | TRUE        |
| cmdPrefix           | prefix for command trigger                                     | `!/.`

### Event

Available :

- **on**(`updateType, stop=true`)
- **cmd**(`string, callback, stop=true`)
- **hear**(`regex|string, callback, stop=true`)
- hears(`regex|string, callback, stop=true`) alias hear
- **command** alias `cmd`

Example:

```javascript
bot.cmd('ping', callback);
bot.hear('hello', callback);
bot.hear(/^!time$/i, callback);

bot.hear(/coffee/i, callback, false); // if found stopable? false. So, catch condition anatoher again bellow
bot.hear(/tea/i, callback);
```

### Update Type

Example:

```javascript
bot.on('raw', (ctx) => terminal.less(ctx) );
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
| Api       | access for [API Telegram](https://core.telegram.org/)              |
| client    | client connecton                                                  |
| BotApi    | wrapper for [Bot Api Telegram](https://core.telegram.org/bots/api) |
| terminal  | console replacement for colorful and bettermore                   |
| lessLog   | better than`console.log` function, less prefix \_ field           |
| asBotApi  | `true`/`false`                                                    |
| version   | duagrams version info                                             |
| cmdPrefix | default is`.!/`                                                   |
| Helper    | [Go to helper doc](https://github.com/ubotindonesia/duagram/blob/main/docs/helper.md)                                                          |

Example:

```javascript
const bot = new duaGram({...});

bot.cmdPrefix = '~'; // bot.cmd('ping', ..) => ~ping
console.log(bot.version);

```

#### Alias

- tg (alias `telegram`)
- invoke(`params`)
- sendMessage(`peer, text, more`)
- ... etc (like **telegram** method)

## Telegram

### method

- invoke(`params`)
- getPeerId(`ctx`)
- sendMessage(`peer, text, more`)
- editMessage(`peer, id, text, more`)
- deleteMessages(`peer, ids, more`)
- forwardMessages(`peerFrom, peerTo, ids, more`)
- getMessages(`peer, ids`)
- pinMessage(`peer, id, more`) 
- unpinAllMessages(`peer`)
- readHistory(`peer, more`)
- getUserPhotos(`peer, more`)
- getUserInfo(`peer`)
- editAdmin(`peerChatId, peerUserId, more = {}`)
- editBanned(`peerChatId, peerUserId, more = {}`)

## Middleware

Middleware is an essential part of any modern framework. It allows you to modify requests and responses as they pass between the Telegram and your bot.

You can imagine middleware as a chain of logic connection your bot to the Telegram request.

Middleware normally takes two parameters `(ctx, next)`, `ctx` is the context for one Telegram update, `next` is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.

```javascript
bot.middleware((ctx, next) => {
    ctx.additional = 'message test from middleware';
    next();
});

bot.cmd('plus', async (ctx) => {   
    if (!ctx.out)
        return bot.sendMessage(ctx, `Hooked: ${ctx.additional}`);
})
```


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

### Inspiration

- [Telegraf](https://telegraf.js.org/)
- [Butthx](https://github.com/butthx) for [tgsnake](https://github.com/butthx/tgsnake/)
- _for all of you who have tested and used this framework.._ 😄

### Happy nge-bot!

If you are Indonesian, let's join the [@ubotindonesia](https://t.me/ubotindonesia) telegram group.

_see you again_ ^^
