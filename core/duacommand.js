const DuaEvent = require('./duaevent');

class DuaCommand extends DuaEvent {
  constructor(options) {
    super();
  }

  buildOn(update) {
    const { sendMessage } = this;
    return {
      reply(text, more = {}) {
        sendMessage(update.chat.id, text, more);
      },
    }
  }

}

module.exports = DuaCommand;