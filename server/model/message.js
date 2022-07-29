const messages = require('../config/botMessages/messages.json');

module.exports = {
    getMessage: (msgReceived) => {
        return messages.find(msg => msg.messsageReceived == msgReceived).body;
    },

    sendMessage: (msgReceived, msgBody) => {
        msgReceived.reply(msgBody);
        return `Message Responsed: ${msgBody}`;
    }
}