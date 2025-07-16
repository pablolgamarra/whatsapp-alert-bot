import bot from '../index.js';

export default async function sendMessage(chatId, message) {
	if (!chatId || !message) {
		throw Error(`Chat ID and Message are required to send a message through the bot`);
	}

	const sendedMsg = await bot.sendMessage(chatId, message);

	const logMsg = {
		To: sendedMsg.to,
		From: sendedMsg.from,
		Body: sendedMsg.body,
	};

	console.log('Mensaje de Alerta Enviado por WP -> ', logMsg);
}
