const { writeFileSync } = require('node:fs');

module.exports = {
    saveQR: (text) => {
        writeFileSync("QRCode.txt", text);
    }
}