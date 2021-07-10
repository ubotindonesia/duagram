const EventEmitter = require('events');
const { terminal } = require('../utils/log');

class DuaEvent extends EventEmitter {
    constructor(options) {
        super();
        this.asBotApi;
        this.cmdPrefix = "!./";
        this.BotApi = false;
        this.telegram = false;
        this.client = false;
        this.scanners = [];
    }

    init(options) {
        try {
            if (typeof options !== 'object') throw Error('Please, check documentation to starting bot.');
            if (!options.api_id) throw Error('api_id is required.');
            if (!options.api_hash) throw Error('api_hash is required.');
            if (parseInt(options.api_id) < 5000) throw Error('api_id - get it from https://my.telegram.org');

            options.session = options.session || '';
            options.logDetail = options.logDetail || 'debug';
            options.logLevel = options.logLevel || 1;
            options.floodSleepThreshold = options.floodSleepThreshold || 60;

            options.connectionRetries = options.connectionRetries || 3;
            options.markRead = options.markRead || true;

            this.options = options;

        } catch (error) {
            terminal.error(error.message);
            terminal.warn('Please, check your options again.');
            process.exit();
        }
    }

    startBanner() {
        terminal.info('=====================');
        terminal.info('| The Journey Begins |');
        terminal.info('---------------------')
    }

    escapeRegExp(str) {
        if (typeof str === 'string')
            return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                .replace(/-/g, '\\x2d');
        return str;
    }

    scanningText(ctx) {
        let text = ctx.message;
        let found = false; let matchPattern = [];
        let walk = true;

        if (this.scanners.length <= 0) {
            terminal.debug('Scanners empty');
            return false;
        }
        
        this.scanners.forEach((scanner) => {
            let { key, callback, stop } = scanner;
            // terminal.debug('scanning:', `${key} match with ${text}?`);
            if (!walk) return;
            if (key instanceof RegExp) {
                let match;
                if (match = key.exec(text)) {
                    found = true; walk = stop; 
                    matchPattern.push(key);
                    ctx.match = match;
                    return callback(ctx);
                }
            }
            if (key == text) {
                found = true; walk = stop;
                matchPattern.push(key);
                return callback(ctx);
            }

        });
        if (this.logLevel > 0 && found && matchPattern.length > 0) {
            matchPattern.forEach(key => terminal.debug(`Match [${key}]: ${text}`));
        }
        return found;
    }

    hear(key, callback, stop = true) {
        return this.scanners.push({ key, callback, stop })
    }

    hears(key, callback, stop = true) {
        return this.scanners.push({ key, callback, stop })
    }

    cmd(str, callback, stop = true) {
        let key = new RegExp(`^[${this.escapeRegExp(this.cmdPrefix)}]${str}$`, "i");
        return this.scanners.push({ key, callback, stop })
    }

    command(str, callback, stop = true) {
        let key = new RegExp(`^[${this.escapeRegExp(this.cmdPrefix)}]${str}$`, "i");
        return this.scanners.push({ key, callback, stop })
    }

}

module.exports = DuaEvent;