const messages = require('../config/botMessages/messages.json');
const stickerCreator = require('../util/stickerCreator/stickers');

module.exports = {
    getMessage: (msgReceived) => {
        return messages.find(msg => msg.messsageReceived == msgReceived).body;
    },

    sendMessage: (msgReceived, msgBody) => {
        msgReceived.reply(msgBody);
        return `Message Responsed With --- ${msgBody}`;
    },

    sendSticker: (msgReceived) => {
        stickerCreator.createSticker(msgReceived, msgReceived.from);
        return `Message Responsed With Sticker Created`;
    }
}