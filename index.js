const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messages2send = require('./src/modules/messages/messages2Send.json');
const {createSticker} = require('./src/modules/stickerCreator/app.js');
const WAWebJS = require('whatsapp-web.js');
const command = require('nodemon/lib/config/command');

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

    if(!isStatus && body.startsWith('!')){
        console.log('New bot require command received');
        console.log(comands.filter(`${body}`));
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
                createSticker(msg,from);
            }else{
                msg2send = messages2send['!Sticker'].notSticker;
            }
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
