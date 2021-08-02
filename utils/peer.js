function typeCheck(value) {
    const return_value = Object.prototype.toString.call(value);
    // we can also use regex to do this...
    const type = return_value.substring(
        return_value.indexOf(" ") + 1,
        return_value.indexOf("]"));

    return type.toLowerCase();
}

/*
// chat biasa
{
  id: 1210,
  fromId: VirtualClass {
    CONSTRUCTOR_ID: 2645671021,
    SUBCLASS_OF_ID: 47470215,
    className: 'PeerUser',
    classType: 'constructor',
    userId: 213567634
  },
  peerId: VirtualClass {
    CONSTRUCTOR_ID: 3134252475,
    SUBCLASS_OF_ID: 47470215,
    className: 'PeerChat',
    classType: 'constructor',
    chatId: 544365226
  },

//chat supergrup

  peerId: VirtualClass {
    CONSTRUCTOR_ID: 3185435954,
    SUBCLASS_OF_ID: 47470215,
    className: 'PeerChannel',
    classType: 'constructor',
    channelId: 1205955474
  },

  //

  */

module.exports = (ctx) => {
    if (typeof ctx == 'number') {
        return ctx;
        if (ctx < 0) {
            return parseInt(String(ctx).replace('-100', ''));
        }
        return ctx;
    }

    if (typeof ctx == 'string') return ctx;

    // console.log('TIPE:', typeCheck(ctx));

    //if (ctx.hasOwnProperty('peer'))
    if (typeof ctx.peer?.id == 'number')
        return ctx.peer?.id;

    if (typeof ctx.chat?.id == 'number')
        return ctx.chat?.id;

    if (typeof ctx.message?.message?.peerId?.userId == 'number')
        return ctx.message?.peerId?.userId;

    if (typeof ctx.message?.peerId?.userId == 'number')
        return ctx.message?.peerId?.userId;

    if (typeof ctx.peerId?.userId == 'number')
        return ctx.peerId?.userId;

    if (typeof ctx.message?.message?.peerId?.channelId == 'number')
        return ctx.message?.peerId?.channelId;

    if (typeof ctx.message?.peerId?.channelId == 'number')
        return ctx.message?.peerId?.channelId;

    if (typeof ctx.peerId?.channelId == 'number')
        return ctx.peerId?.channelId;

    // letakkan akhir
    if (ctx.userId)
        if (typeof ctx.userId == 'number')
            return ctx.userId;

    if (ctx.channelId)
        if (typeof ctx.channelId == 'number')
            return ctx.channelId;

    return ctx;
}