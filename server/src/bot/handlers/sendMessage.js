import bot from '../index.js';

export default async function sendMessage(chatId, message) {
	if (!chatId || !message) {
		throw Error(`Chat ID and Message are required to send a message through the bot`);
	}

    let logMsg;

    try{
        const sendedMsg = await bot.sendMessage(chatId, message);
        logMsg = {
            To: sendedMsg.to,
            From: sendedMsg.from,
            Body: sendedMsg.body,
        };
    }catch(e){
        throw e
    }

	console.log(`Message sended to Whatsapp. Chat: ${chatId}. Message -> `, logMsg);
}
