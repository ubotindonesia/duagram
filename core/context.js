
class Context {
    constructor(update, telegram, options = {}) {        
        this.tg = telegram;
        this.update = update;
        this.options = options;
        this.getPeerId = telegram.getPeerId;
    }

  get telegram () {
    return this.tg
  }

  get senderId() {
      return this.update._senderId;
  }

}