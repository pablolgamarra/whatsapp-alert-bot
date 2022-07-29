const qrcode = require('qrcode-terminal');
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
    const { from, to, body, isStatus, type } = msg;

    const msgReceived = `
        "From": ${from},
        "To": ${to},
        "Message": ${body}
    `

    if (isStatus) {
        console.log('New Status Received');
    } else if (body.startsWith('!')) {
        console.log(msgReceived);
        messages.sendMessage(msg, messages.getMessage(body).slice(1));
    }
});

Client.initialize();

module.exports = { Client }