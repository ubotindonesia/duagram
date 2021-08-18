## Release Version

### 1.3.1

`2021-08-18`

- private groups WORKS!
- bug known: private group can't auto readhistory
- upgrade telegram `1.8.6`
    - fix download file until 2 GB

### 1.3.0

- fix version number
- upgrade telegram `1.8.3`

### 1.2.31

- shorten name session to 8 unique char (default)
- [x] known bugs for basic chat, this app not work

### 1.2.7

`2021-08-01`

- new option: `local` and `session_name`, to save to storage session. 
- new event: on `connected`. See [examples](https://github.com/ubotindonesia/duagram/blob/dev/examples/).
- upgrade `telegram` to v`1.8.0`
- bugs fix
    - session: recognise _seen_ user after launch
    - helper 
        - `random`
        - `forEach`

### 1.2.6

`2021-07-23`

- upgrade telegram client `v1.7.23`, bug fix for downloadMedia
- more example: `download.js`


### 1.2.5

`2021-07-18`

- add `telegram` method
    - downloadMedia(`media, more `); // not yet final
        - more: file_name, path, ..etc
        - ex. `bot.tg.downloadMedia(ctx.media.raw, { path: '/tmp'})`
- fix:
    - media.id


### 1.2.4

`2021-07-17`

- fix: 
    - hidden forwarder message
    - ctx media
- rename `media.data` to `media.raw`
- terminal can be hook
- add broadcast type: `forward`, `reply`


### v1.2.3

- add **ctx** method: 
    - `replyWithMarkdown(text, more)`
    - `replyWithSendFile(file, more)`
- add `media.data` if `ctx` contains media.
- add **telegram** method: 
    - `readMentions(peer)`
    - `readMessageContents(id)`
    - `deleteHistory(peer, more)`
    - `deleteUserHistory(channelId, userId)`
- add **Helper** method:
    - `chat.to_api(chat_id)` convert from userbot channel id to bot api
    - `chat.from_api(chat_id)` convert to userbot channel id

### v1.2.2

- add `ctx` method 
    - `reply(text, more)` 
    - `replyWithHTML(text, more)`
- fix middleware (update, _ctx);
- upgrade telegram client (gramjs) v`1.7.15`


### v1.2.1

- fix `getPeerId` for new json format (`ctx.chat.id`)

### v1.2.0

`2021-07-15`

- getMe(`peer`)
- Helper: `cleanObject()`
- `terminal.more()` unstopable json view data
- option:`floodSleepThreshold` default set to `90` seconds
- **rewrite ctx message format**, check examples


### v1.1.5

`2021-07-12`

- rename `peerGetID` to `getPeerID`;
- `getPeerId` bot API style accept too (`-100xxxx`)
- `middleware` fix to `message` event
- `telegram` class add more methode
    - getMessages
    - pinMessage
    - unpinAllMessages
    - getUserPhotos
    - getUserInfo
    - editAdmin
    - editBanned
    - sendFile
    - joinGroup
- fix bugs: `more` options to all method
- add package `request` dependendcy
- `lessLog` changeto `terminal.less`

### v1.1.2

`2021-07-11`

- add middleware feature
- add `cmdPrefix` to options client
- fix bugs: session logging info

### v1.0.0

First version

`2021-07-10`

Initial release.