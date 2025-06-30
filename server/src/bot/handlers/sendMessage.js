import bot from '../index.js';

//GROUP ID
//('120363403436947168@g.us');

export default async function sendMessage(message) {
	const sendedMsg = await bot.sendMessage('120363403436947168@g.us', message);

	const logMsg = {
		To: sendedMsg.to,
		From: sendedMsg.from,
		Body: sendedMsg.body,
	};
	console.log('Mensaje de Alerta Enviado por WP -> ', logMsg);
}
