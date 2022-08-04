const qrcode = require('qrcode-terminal');
const { MessageTypes } = require('whatsapp-web.js');
const WAWebJS = require('whatsapp-web.js');
const client = require('./client');
const messages = require('./message');

const Client = client.getWAClient();

Client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
})

Client.on('ready', () => {
    console.log('Client Ready');
});

Client.on('authenticated', () => {
    console.log('Client Authenticated');
})

Client.on('message', msg => {
    const { from, to, body, isStatus, type, timestamp } = msg;

    const msgReceived = `
        "From": ${from} --- "To": ${to} --- "Message": ${body} --- ${new Date(timestamp * 1000)}
    `
    switch (type) {
        case MessageTypes.AUDIO || MessageTypes.VOICE:
            console.log(`Audio Received\n"From": ${from} --- "To": ${to} --- ${new Date(timestamp * 1000)}`);
            break;

        case MessageTypes.IMAGE || MessageTypes.VIDEO:
            if (isStatus) {
                console.log('New Status Received');
            } else if (body == '!Sticker') {
                console.log(`Media Received\n"From": ${from} --- "To": ${to} --- ${new Date(timestamp * 1000)}`);
                messages.sendSticker(msg);
            }
            break;

        case MessageTypes.TEXT:
            if (isStatus) {
                console.log('New Status Received');
            } else if (body.startsWith('!')) {
                console.log(msgReceived);
                messages.sendMessage(msg, messages.getMessage(body.slice(1)));
            }
            break;

        default:
            console.log(msgReceived);
            break;
    }
});

module.exports = { Client }