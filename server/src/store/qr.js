let qr = undefined;
let qrCount = 0

export function setQR(qrSet) {
	qr = qrSet;
    qrCount++;
}

export function getQR() {
	return {qr, qrCount};
}
