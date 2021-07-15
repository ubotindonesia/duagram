module.exports = (ctx) => {
    if (typeof ctx == 'number') {
        if (ctx < 0) {
            return parseInt(String(ctx).replace('-100', ''));
        }
        return ctx;
    }

    if (typeof ctx == 'string') return ctx;

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