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

### Middleware List

- [duaGram rate-limit](https://www.npmjs.com/package/duagram-ratelimit)