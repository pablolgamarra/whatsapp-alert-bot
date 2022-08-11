const messages = require('../config/botMessages/messages.json');
const stickerCreator = require('../util/stickerCreator/stickers');
const pdfParser = require('../util/pdfParser/parser');
const numberFormatter = require('../util/numberFormatter/formatter');
const { MessageMedia } = require('whatsapp-web.js');

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
    },

    sendPDF: (Client, number, filePath) => {
        const data = pdfParser.parser(filePath);
        const message = new MessageMedia('application/pdf', data, 'Factura');
        Client.sendMessage(number, numberFormatter.formatter(number), pdfParser('TEST.pdf'));
    }
}