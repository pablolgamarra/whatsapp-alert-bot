export function handleMessage(msg) {
	const { from, to, body, isStatus, type, timestamp } = msg;

	const msgReceived = `
            "From": ${from} --- "To": ${to} --- "Message": ${body} --- ${new Date(timestamp * 1000)}
        `;

	console.log('Message Received', msgReceived);

	switch (type) {
		case MessageTypes.AUDIO || MessageTypes.VOICE:
			console.log(`Audio Received\n"From": ${from} --- "To": ${to} --- ${new Date(timestamp * 1000)}`);
			break;

		case MessageTypes.IMAGE || MessageTypes.VIDEO:
			if (isStatus) {
				console.log('New Status Received');
			} else if (body == '!Sticker') {
				console.log(`Media Received\n"From": ${from} --- "To": ${to} --- ${new Date(timestamp * 1000)}`);
			}
			break;

		case MessageTypes.TEXT:
			if (isStatus) {
				console.log('New Status Received');
			} else if (body.startsWith('!')) {
				console.log(msgReceived);
			}
			break;
		default:
			console.log(msgReceived);
			break;
	}
}
