const sharp = require('sharp');
const { MessageMedia } = require('whatsapp-web.js');
const { Buffer } = require('node:buffer');

async function createSticker(msg, from) {
    //Creating the .webp file
    try {
        const { data } = await msg.downloadMedia();
        buff = Buffer.from(data, 'base64');
        image = await sharp(buff)
            .resize({
                width: 512,
                height: 512,
                fit: 'contain'
            })
            .toFormat('webp')
            .toBuffer();
        console.log('Sticker Created');
        const msg2send = new MessageMedia('image/webp', image, 'Sticker');
        msg.reply(msg2send, from, { sendMediaAsSticker: true, stickerAuthor: 'wp-bot @pablolgamarra' });

    } catch (error) {
        if (error) {
            console.log(`An error was happened during the creation of the sticker.\nError: ${error}`);
        }
    }
}

module.exports = { createSticker };