const DuaEvent = require('./duaevent');

class DuaCommand extends DuaEvent {
  constructor(options) {
    super();
  }

  async getMe(peer = false) {
    return await this.client.getMe(peer)
  }

  // alias
  async sendMessage(peer, text, more = {}) {
    return await this.telegram.sendMessage(peer, text, more);
  }

  async editMessage(peer, id, text, more = {}) {
    return await this.telegram.editMessage(peer, id, text, more);
  }

  async deleteMessages(peer, ids, revoke = true) {
    return await this.telegram.deleteMessages(peer, ids, revoke)
  }

  async deleteMessage(peer, ids, revoke = true) {
    return await this.telegram.deleteMessages(peer, ids, revoke)
  }

  async forwardMessages(peerFrom, peerTo, ids, more = {}) {
    return await this.telegram.forwardMessages(peerFrom, peerTo, ids, more);
  }

  async getMessages(peer, ids) {
    return await this.telegram.getMessages(peer, ids);
  }

  async getMessage(peer, ids) {
    return await this.telegram.getMessages(peer, ids);
  }

  async readMentions(peer) {
    return await this.telegram.readMentions(peer);
  }

  async readMessageContents(id) {
    return await this.telegram.readMessageContents(id);
  }

  async deleteHistory(peer, more = {}) {
    return await this.telegram.deleteHistory(peer, more);
  }

  async deleteUserHistory(channelId, userId) {
    return await this.telegram.deleteUserHistory(channelId, userId);
  }

  async pinMessage(peer, id, more = {}) {
    return await this.telegram.pinMessage(peer, id, more);
  }

  async unpinAllMessages(peer) {
    return await this.telegram.unpinAllMessages(peer);
  }

  async getUserPhotos(peer, more = {}) {
    return await this.telegram.getUserPhotos(peer, more);
  }

  getPeerId(ctx) {
    return this.telegram.getPeerId(ctx);
  }

  async invoke(data) {
    return await this.telegram.invoke(data);
  }

  async editAdmin(peerChatId, peerUserId, more = {}) {
    return await this.telegram.editAdmin(peerChatId, peerUserId, more);
  }

  async editBanned(peerChatId, peerUserId, more = {}) {
    return await this.telegram.editBanned(peerChatId, peerUserId, more);
  }

  async getUserInfo(peer) {
    return await this.telegram.getUserInfo(peer);
  }

  async joinGroup(peer) {
    return await this.telegram.joinGroup(peer);
  }


  async sendFile(peer, file, more = {}) {
    return await this.telegram.sendFile(peer, file, more);
  }

  buildOn(update) {
    let command = {};

    command.reply = async (text, more = {}) => {
      return await this.sendMessage(update.chat.id, text, more);
    };

    command.replyWithHTML = async (text, more = {}) => {
      return await this.sendMessage(update.chat.id, text, { parse_mode: 'html', ...more });
    };
    command.replyWithMarkdown = async (text, more = {}) => {
      return await this.sendMessage(update.chat.id, text, { parse_mode: 'markdown', ...more });
    };
    command.replyWithSendFile = async (file, more = {}) => {
      return await this.sendFile(update.chat.id, file, more);
    };
    command.deleteMessage = async (revoke = true) => {
      return await this.deleteMessages(update.id, revoke);
    };

    Object.assign(update, command);
    return update;
  }

  // end class
}

module.exports = DuaCommand;