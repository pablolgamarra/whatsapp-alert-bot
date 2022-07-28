const sharp = require('sharp');
const {MessageMedia} = require('whatsapp-web.js');
const {Buffer} = require('node:buffer');

async function createSticker(msg, from){
    //Creating the .webp file
    try {
        const {data} = await msg.downloadMedia();
        buff = Buffer.from(data, 'base64');
        image = sharp(buff)
            .resize({
                width : 512,
                height : 512,
                fit : 'contain'
            });
        await image.toFile('src/media/created/output.webp', (err) => {
            if (err) {
                console.log(err);
            }else{
                console.log('Sticker Created');
                const msg2send = MessageMedia.fromFilePath('src/media/created/output.webp');
                msg.reply(msg2send, from, {sendMediaAsSticker : true, stickerAuthor : 'wp-bot @Towel15'});
            }
        });
    } catch (error) {
        if(error){
            console.log(`An error was happened during the creation of the sticker.\nError: ${error}`);
        }
    }
}

module.exports = {createSticker};