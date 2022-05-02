const {Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const messages2send = require('./src/modules/messages/messages2Send.json');
const {downloadMsgMedia} = require('./src/modules/stickerCreator/app.js');
const sharp = require('sharp');
const WAWebJS = require('whatsapp-web.js');

const client = new Client({
    authStrategy : new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small : true});
})

client.on('ready', ()=>{
    console.log('Client Ready');
});

client.on('authenticated', ()=>{
    console.log('Client Authenticated');
})

client.on('message',(msg)=>{
    const {from, to, body, isStatus, type} = msg;

    const msgReceived = {
        "From" : from,
        "To" : to,
        "Message" : body
    }

    if(!isStatus){
        console.log('New Message Received.');
        console.log(msgReceived);
    }

    let msg2send;

    let comands = [];
    for(const i in messages2send){
        comands.push(i);
    }

    switch(body){
        case '!Hola Bot':
            msg2send = messages2send['!Hola'].body; 
            msg.reply(msg2send);

            msg2send = `Los Comandos Disponibles son:\n ${comands.join("\n")}`;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Gaspi Bot':
            msg2send = messages2send['!Gaspi Bot'].body;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Sticker':
            if((type === WAWebJS.MessageTypes.IMAGE) || (type === WAWebJS.MessageTypes.VIDEO)){
                downloadMsgMedia(msg);
                let data = 
                msg2send = new MessageMedia('.webp', data, 'Pablo');
                try {
                    client.sendMessage(from, msg2send,{sendMediaAsSticker : true})
                        .then(()=>{
                            console.log('Sticker Sended');
                        })
                } catch (error) {
                    if(error){
                        console.log(`An error was happened. Error: ${error}`);
                    }
                }
                msg.reply(msg2send);
            }
            msg2send = messages2send['!Sticker'].body;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Audio':
            msg2send = messages2send['!Audio'].body;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Hola':
            msg2send = messages2send['!Hola'].body;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Proposito':
            msg2send = messages2send['!Proposito'].body;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Qatar':
            msg2send = messages2send['!Qatar'].body;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
        case '!Comandos':
            msg2send = `Los Comandos Disponibles son:\n ${comands.join("\n")}`;
            msg.reply(msg2send);
            console.log('Bot Command Responsed');
            break;
    }
});

client.initialize();

module.exports = {client};
