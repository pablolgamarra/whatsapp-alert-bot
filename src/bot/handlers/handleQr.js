import { setQR } from '../../store/qr.js';

export function handleQr(qr) {
	console.log('QR Recibido');
	setQR(qr);
}
