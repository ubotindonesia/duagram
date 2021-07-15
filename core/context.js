const { Telegram } = require('./telegram');

class Context {
  constructor(update, telegram, options = {}) {
    this.tg = telegram;
    this.update = update;
    this.options = options;
  }

  get telegram() {
    return this.tg;
  }

  reply(text, more = {}) {
    this.tg.sendMessage(this.update.chat.id, text, more);
  }

  get command() {
    return {
      reply: this.reply
    }
  }

}

module.exports = Context;