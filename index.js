const AppVersion = require("./version");
const { DuaGram } = require("./core/duagram");
let { terminal } = require('./utils/log');

class duaGram extends DuaGram {
    constructor(options) {
        super(options);
        this.me = false;
    }

    startBanner() {
        this.terminal.info('=====================');
        this.terminal.info('| The Journey Begins |');
        this.terminal.info('---------------------')
    }

    get version() {
        return AppVersion;
    }
}

module.exports = {
    duaGram, terminal
};