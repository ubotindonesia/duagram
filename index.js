const AppVersion = require("./version");
const { DuaGram, terminal, lessLog, Helper } = require("./core/duagram");

class duaGram extends DuaGram {
    constructor(options) {
        super(options);
        this.me = false;
        this.Helper = Helper;
    }

    startBanner() {
        terminal.info('=====================');
        terminal.info('| The Journey Begins |');
        terminal.info('---------------------')
    }

    get version() {
        return AppVersion;
    }
}

module.exports = {
    duaGram, terminal, lessLog, Helper
};