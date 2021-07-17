const { duaGram } = require("duagram");

class duaG extends duaGram {
    constructor(options) {
        super(options);
        this.myInit();
        this.prefixTerminal = '[anu]';
    }

    myInit() {
        this.oldTerminal = this.terminal;        
        let terminal = this.terminal;

        let newTerminal = {}
        let prefix = this.prefix.terminal;

        newTerminal = {
            log(...args) { return terminal.log(prefix, ...args); },
            info(...args) { return terminal.info(prefix, ...args); },
            warn(...args) { return terminal.warn(prefix, ...args); },
            debug(...args) { return terminal.debug(prefix, ...args); },
            less(...args) { return terminal.less(prefix, ...args); },
            more(...args) { return terminal.more(prefix, ...args); },
        }
        this.terminal = newTerminal;
    }
}

const bot = new duaG({
    api_id: 1, api_hash: 'your-api-hash', session: ''
});

bot.cmd('ping', (ctx) => {
    bot.terminal.log(ctx);
    return ctx.reply('Pong!');
});

bot.start();

/*
[15:32:56][info] [anu] =====================
[15:32:56][info] [anu] | The Journey Begins |
[15:32:56][info] [anu] ---------------------
[15:32:58][log] [anu] This session: xxx
[15:32:59][warn] [anu] You login as [userbot]
[15:32:59][info] [anu] About me [name: your name][username: @username] [phone: +12345678901]
[15:32:59][info] [anu] I'm ready here, waiting for your activity...
...

*/