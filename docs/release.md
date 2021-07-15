## Release Version
### v1.2.2

- new `ctx.reply(text, more)` and  `ctx.replyWithHTML(text, more)`
- fix middleware (update, _ctx);
- upgrade telegram (gramjs) client v`1.7.15`


### v1.2.1

- fix getPeerId for new json format (ctx.chat.id)

### v1.2.0

`2021-07-15`

- getMe(`peer`)
- Helper: `cleanObject()`
- `terminal.more()` unstopable json view data
- option:`floodSleepThreshold` default set to `180` seconds
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