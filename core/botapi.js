'use strict';
const RequestPromise = require('request-promise');
const Stream = require('stream');
const Path = require('path');

class botApi  {
  constructor(token) {
    if (token === undefined) {
      throw new Error('Please provide a Telegram bot token when instantiating');
    }
    this._token = token;
  }

  request(method, params, formData) {
    if (arguments.length === 0 || typeof arguments[0] !== 'string') {
      throw new Error('Please provide method as a string');
    }

    // the 2nd, 3rd or 4th argument could be a callback
    let callback;
    if (typeof arguments[3] == 'function') {
      callback = arguments[3];
    } else if (typeof arguments[2] == 'function') {
      callback = arguments[2];
      formData = null;
    } else if (typeof arguments[1] == 'function') {
      callback = arguments[1];
      params = null;
    }

    let options = {
      uri: 'https://api.telegram.org/bot' + this._token + '/' + method,
      qs: params,
      formData: formData,
      simple: false,
      resolveWithFullResponse: true,
      forever: true
    };

    return RequestPromise(options)
    .then(resp => {
      if (resp.statusCode !== 200) {
        throw new Error(resp.statusCode + ':\n'+ resp.body);
      }

      let updates = JSON.parse(resp.body);

      if (updates.ok) {
        if (callback) { 
          callback(null, updates);
        }

        return updates;
      }
      return null;
    })
    .catch(error => {
      if (callback) {
        callback(error);
      }
      else {
        throw error;
      }
    });
  }

  getMe(callback) {
    return this.request('getMe', callback);
  }

  getUpdates(offset, callback) {
    let params = {
      offset: offset,
      timeout: 10
    };

    return this.request('getUpdates', params, callback);
  }

  setWebhook(url, more, callback) {
    let params = {
      url: url
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('setWebhook', url, params, callback);
  }

  deleteWebhook(more, callback) {
    return this.request('deleteWebhook', more, callback);
  }

  getWebhookInfo(callback) {
    return this.request('getWebhookInfo', callback);
  }

  logOut(callback) {
    return this.request('logOut', callback);
  }

  close(callback) {
    return this.request('close', callback);
  }

  sendMessage(chatId, text, more, callback) {
    let params = {
      chat_id: chatId,
      text: text
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more, callback);
    }

    return this.request('sendMessage', params, callback);
  }

  answerCallbackQuery(callbackQueryId, more, callback) {
    let params = {
      callback_query_id: callbackQueryId
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('answerCallbackQuery', params, callback);
  }

  setMyCommands(commands, callback) {
    return this.request('setMyCommands', commands, callback);
  }

  getMyCommands() {
    return this.request('getMyCommands', callback);
  }

  editMessageText(chatId, messageId, text, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      text: text
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageText', params, callback);
  }

  editInlineMessageText(inlineMessageId, text, more, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      text: text
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageText', params, callback);
  }

  editMessageCaption(chatId, messageId, caption, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      caption: caption
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageCaption', params, callback);
  }

  editInlineMessageCaption(inlineMessagId, caption, more, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      caption: caption
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageCaption', params, callback);
  }

  editMessageMedia(chatId, messageId, media, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      media: media
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageMedia', params, callback);
  }

  editInlineMessageMedia(inlineMessageId, media, more, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      media: media
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageMedia', params, callback);
  }

  editMessageReplyMarkup(chatId, messageId, replyMarkup, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: replyMarkup
    }

    return this.request('editMessageReplyMarkup', params, callback);
  }

  editInlineMessageReplyMarkup(inlineMessageId, replyMarkup, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      reply_markup: replyMarkup
    }

    return this.request('editMessageReplyMarkup', params, callback);
  }

  deleteMessage(chatId, messageId, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId
    }

    return this.request('deleteMessage', params, callback);
  }

  answerInlineQuery(inlineQueryId, results, more, callback) {
    let params = {
      inline_query_id: inlineQueryId,
      results: results
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('answerInlineQuery', params, callback);
  }

  forwardMessage(chatId, fromChatId, messageId, more, callback) {
    let params = {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('forwardMessage', params, callback);
  }

  copyMessage(chatId, fromChatId, messageId, more, callback) {
    let params = {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('copyMessage', params, callback);
  }

  sendPhoto(chatId, photo, more, callback) {
    let params;
    let formData;
  
    if (isReadableStream(photo)) {
      params = {
        chat_id: chatId
      };
      formData = {
        photo: photo
      };
    } else {
      params = {
        chat_id: chatId,
        photo: photo
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendPhoto', params, formData, callback);
  }

  sendAudio(chatId, audio, more, callback) {
    let params;
    let formData;

    if (isReadableStream(audio)) {
      params = {
        chat_id: chatId
      };
      formData = {
        audio: audio
      };
    } else {
      params = {
        chat_id: chatId,
        audio: audio
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendAudio', params, formData, callback);
  }

  sendDocument(chatId, document, more, callback) {
    let params;
    let formData;

    if (isReadableStream(document)) {
      params = {
        chat_id: chatId
      };
      formData = {
        document: document
      };
    } else {
      params = {
        chat_id: chatId,
        document: document
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendDocument', params, formData, callback);
  }

  sendAnimation(chatId, animation, more, callback) {
    let params;
    let formData;

    if (isReadableStream(animation)) {
      params = {
        chat_id: chatId
      };
      formData = {
        animation: animation
      };
    } else {
      params = {
        chat_id: chatId,
        animation: animation
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendAnimation', params, formData, callback);
  }

  // Polls

  sendPoll(chatId, question, pollOptions, more, callback) {
    let params = {
      chat_id: chatId,
      question: question,
      options: pollOptions
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more, callback);
    }

    return this.request('sendPoll', params, callback);
  }

  stopPoll(chatId, messageId, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more, callback);
    }

    return this.request('stopPoll', params, callback);
  }

  // Stickers

  sendSticker(chatId, sticker, more, callback) {
    let params;
    let formData;

    if (isReadableStream(sticker)) {
      params = {
        chat_id: chatId
      };
      formData = {
        sticker: sticker
      };
    } else {
      params = {
        chat_id: chatId,
        sticker: sticker
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendSticker', params, formData, callback);
  }

  getStickerSet(name, callback) {
    let params = {
      name: name
    }

    return this.request('getStickerSet', params, callback);
  }

  uploadStickerFile(userId, pngFile, callback) {
    let params = {
      user_id: userId,
    };

    let formData = {
      png_sticker: pngFile
    };

    return this.request('uploadStickerFile', params, formData, callback);
  }

  createNewStickerSet(userId, name, title, stickerFile, emojis, more, callback) {
    let params;
    let formData;

    if (isReadableStream(stickerFile)) {
      // stickerFile is a readableStream, check extension
      let ext = Path.extname(stickerFile.path);
      
      if (ext === '.png') {
        params = {
          user_id: userId,
          name: name,
          title: title,
          emojis: emojis
        };
        formData = {
          png_sticker: stickerFile
        };
      } else if (ext === '.tgs') {
        params = {
          user_id: userId,
          name: name,
          title: title,
          emojis: emojis
        };
        formData = {
          tgs_sticker: stickerFile
        };
      }
    } else {
      // stickerFile is a string, either a file_id or HTTP URL
      params = {
        user_id: userId,
        name: name,
        title: title,
        png_sticker: stickerFile,
        emojis: emojis
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('createNewStickerSet', params, formData, callback);
  }

  addStickerToSet(userId, name, stickerFile, emojis, more, callback) {
    let params;
    let formData;

    if (isReadableStream(stickerFile)) {
      // stickerFile is a readableStream, check extension
      let ext = Path.extname(stickerFile.path);

      if (ext === '.png') {
        params = {
          user_id: userId,
          name: name,
          emojis: emojis
        };
        formData = {
          png_sticker: stickerFile
        };
      } else if (ext === '.tgs') {
        params = {
          user_id: userId,
          name: name,
          emojis: emojis
        };
        formData = {
          tgs_sticker: stickerFile
        };
      }
    } else {
      // stickerFile is a string, either a file_id or HTTP URL
      params = {
        user_id: userId,
        name: name,
        png_sticker: stickerFile,
        emojis: emojis
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('addStickerToSet', params, formData, callback);
  }

  setStickerPositionInSet(sticker, position, callback) {
    let params = {
      sticker: sticker,
      position: position
    }

    return this.request('setStickerPositionInSet', params, callback);
  }

  deleteStickerFromSet(sticker, callback) {
    let params = {
      sticker: sticker
    }

    return this.request('deleteStickerFromSet', params, callback);
  }

  setStickerSetThumb(name, userId, thumbnailFile, callback) {
    let params;
    let formData;

    if (isReadableStream(thumbnailFile)) {
      // thumbnailFile is a readableStream, check extension
      let ext = Path.extname(thumbnailFile.path);

      if (ext === '.png') {
        params = {
          user_id: userId,
          name: name
        };
        formData = {
          thumb: thumbnailFile
        };
      } else if (ext === '.tgs') {
        params = {
          user_id: userId,
          name: name
        };
        formData = {
          thumb: thumbnailFile
        };
      }
    } else {
      // thumbnailFile is a string, either a file_id or HTTP URL
      params = {
        user_id: userId,
        name: name,
        thumb: thumbnailFile
      };
    }

    return this.request('setStickerSetThumb', params, formData, callback);
  }

  sendVideo(chatId, video, more, callback) {
    let params;
    let formData;

    if (isReadableStream(video)) {
      params = {
        chat_id: chatId
      };
      formData = {
        video: video
      };
    } else {
      params = {
        chat_id: chatId,
        video: video
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendVideo', params, formData, callback);
  }

  sendVoice(chatId, voice, more, callback) {
    let params;
    let formData;

    if (isReadableStream(voice)) {
      params = {
        chat_id: chatId
      };
      formData = {
        voice: voice
      };
    } else {
      params = {
        chat_id: chatId,
        voice: voice
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendVoice', params, formData, callback);
  }

  sendVideoNote(chatId, videoNote, more, callback) {
    let params;
    let formData;

    if (isReadableStream(videoNote)) {
      params = {
        chat_id: chatId
      };
      formData = {
        video_note: videoNote
      };
    } else {
      params = {
        chat_id: chatId,
        video_note: videoNote
      };
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendVideoNote', params, formData, callback);
  }

  sendMediaGroup(chatId, media, more, callback) {
    let params = {
      chat_id: chatId,
      media: media
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendMediaGroup', params, callback);
  }

  sendLocation(chatId, lat, lon, more, callback) {
    let params = {
      chat_id: chatId,
      latitude: lat,
      longitude: lon
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendLocation', params, callback);
  }

  editMessageLiveLocation(chatId, messageId, lat, lon, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId,
      latitude: lat,
      longitude: lon
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageLiveLocation', params, callback);
  }

  editInlineMessageLiveLocation(inlineMessageId, lat, lon, more, callback) {
    let params = {
      inline_message_id: inlineMessageId,
      latitude: lat,
      longitude: lon
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editMessageLiveLocation', params, callback);
  }

  stopMessageLiveLocation(chatId, messageId, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('stopMessageLiveLocation', params, callback);
  }

  stopInlineMessageLiveLocation(inlineMessageId, more, callback) {
    let params = {
      inline_message_id: inlineMessageId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('stopMessageLiveLocation', params, callback);
  }

  sendVenue(chatId, lat, lon, title, address, more, callback) {
    let params = {
      chat_id: chatId,
      latitude: lat,
      longitude: lon,
      title: title,
      address: address
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendVenue', params, callback);
  }

  sendContact(chatId, phoneNumber, firstName, more, callback) {
    let params = {
      chat_id: chatId,
      phone_number: phoneNumber,
      first_name: firstName
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendContact', params, callback);
  }

  sendDice(chatId, more, callback) {
    let params = {
      chat_id: chatId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendDice', params, callback);
  }

  sendChatAction(chatId, action, callback) {
    if (typeof action !== 'string') {
      throw new Error('sendChatAction method needs a string input');
    }

    let params = {
      chat_id: chatId,
      action: action
    };

    return this.request('sendChatAction', params, callback);
  }

  getUserProfilePhotos(userId, more, callback) {
    let params = {
      user_id: userId,
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('getUserProfilePhotos', params, callback);
  }

  getFile(fileId, callback) {
    let params = {
      file_id: fileId
    };

    return this.request('getFile', params, callback);
  }

  kickChatMember(chatId, userId, more, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('kickChatMember', params, callback);
  }

  unbanChatMember(chatId, userId, more, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('unbanChatMember', params, callback);
  }

  restrictChatMember(chatId, userId, permissions, more, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId,
      permissions: permissions
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('restrictChatMember', params, callback);
  }

  promoteChatMember(chatId, userId, more, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('promoteChatMember', params, callback);
  }

  setChatAdministratorCustomTitle(chatId, userId, customTitle, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId,
      custom_title: customTitle
    }

    return this.request('setChatAdministratorCustomTitle', params, callback);
  }

  setChatPermissions(chatId, permissions, callback) {
    let params = {
      chat_id: chatId,
      permissions: permissions
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('setChatPermissions', params, callback);
  }

  exportChatInviteLink(chatId, callback) {
    let params = {
      chat_id: chatId
    }

    return this.request('exportChatInviteLink', params, callback);
  }

  createChatInviteLink(chatId, more, callback) {
    let params = {
      chat_id: chatId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('createChatInviteLink', params, callback);
  }

  editChatInviteLink(chatId, inviteLink, more, callback) {
    let params = {
      chat_id: chatId,
      invite_link: inviteLink
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('editChatInviteLink', params, callback);
  }

  revokeChatInviteLink(chatId, inviteLink, callback) {
    let params = {
      chat_id: chatId,
      invite_link: inviteLink
    }

    return this.request('revokeChatInviteLink', params, callback);
  }

  setChatPhoto(chatId, photo, callback) {
    let params = {
      chat_id: chatId
    };

    let formData = {
      photo: photo
    };

    return this.request('setChatPhoto', params, formData, callback);
  }

  deleteChatPhoto(chatId, callback) {
    let params = {
      chat_id: chatId
    }

    return this.request('deleteChatPhoto', params, callback);
  }

  setChatTitle(chatId, title, callback) {
    let params = {
      chat_id: chatId,
      title: title
    }

    return this.request('setChatTitle', params, callback);
  }

  setChatDescription(chatId, description, callback) {
    let params = {
      chat_id: chatId,
      description: description
    }

    return this.request('setChatDescription', params, callback);
  }

  pinChatMessage(chatId, messageId, more, callback) {
    let params = {
      chat_id: chatId,
      message_id: messageId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('pinChatMessage', params, callback);
  }

  unpinChatMessage(chatId, more, callback) {
    let params = {
      chat_id: chatId
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('unpinChatMessage', params, callback);
  }

  unpinAllChatMessages(chatId, callback) {
    let params = {
      chat_id: chatId
    }

    return this.request('unpinAllChatMessages', params, callback);
  }

  leaveChat(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this.request('leaveChat', params, callback);
  }

  getChat(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this.request('getChat', params, callback);
  }

  getChatAdministrators(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this.request('getChatAdministrators', params, callback);
  }

  getChatMembersCount(chatId, callback) {
    let params = {
      chat_id: chatId
    };

    return this.request('getChatMembersCount', params, callback);
  }

  getChatMember(chatId, userId, callback) {
    let params = {
      chat_id: chatId,
      user_id: userId
    };

    return this.request('getChatMember', params, callback);
  }

  setChatStickerSet(chatId, stickerSetName, callback) {
    let params = {
      chat_id: chatId,
      sticker_set_name: stickerSetName
    }

    return this.request('setChatStickerSet', params, callback);
  }

  deleteChatStickerSet(chatId, callback) {
    let params = {
      chat_id: chatId
    }

    return this.request('deleteChatStickerSet', params, callback);
  }

  // Payment

  sendInvoice(chatId, title, description, payload, providerToken, startParameter, currency, prices, more, callback) {
    let params = {
      chat_id: chatId,
      title: title,
      description: description,
      payload: payload,
      provider_token: providerToken,
      start_parameter: startParameter,
      currency: currency,
      prices: prices
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendInvoice', params, callback);
  }

  answerShippingQuery(shippingQueryId, ok, callback) {
    let params = {
      shipping_query_id: shippingQueryId,
      ok: ok
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('answerShippingQuery', params, callback);
  }

  answerPreCheckoutQuery(preCheckoutQueryId, ok, errorMessage) {
    let params = {
      pre_checkout_query_id: preCheckoutQueryId,
      ok: ok,
      error_message: errorMessage
    };

    return this.request('answerShippingQuery', params, callback);
  }

  // Games

  sendGame(chatId, gameShortName, more, callback) {
    let params = {
      chat_id: chatId,
      game_short_name: gameShortName
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('sendGame', params, callback);
  }

  setGameScore(userId, score, more, callback) {
    let params = {
      user_id: userId,
      score: score
    }

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('setGameScore', params, callback);
  }

  getGameHighScores(userId, more, callback) {
    let params = {
      user_id: userId
    };

    if (typeof more == 'function') {
      callback = more;
    } else {
      Object.assign(params, more);
    }

    return this.request('getGameHighScores', params, callback);
  }
}

function isReadableStream(object) {
  return object instanceof Stream.Stream &&
    typeof object._read === "function" &&
    typeof object._readableState === "object"
}

module.exports = botApi;
