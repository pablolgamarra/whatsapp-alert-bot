import qrCode from 'qrcode-terminal';

export function handleQr(qr) {
	console.log('QR Recibido');
	qrCode.generate(qr, { small: true });
}
