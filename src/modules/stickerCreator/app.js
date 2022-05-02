const {Sticker, createSticker, StickerTypes} = require('wa-sticker-formatter');
const fs = require('fs');

function base64Decoder(data){
    const buff = new Buffer.alloc(data, 'base64');
    fs.writeFile('./src/media/created/image.png', buff, {encoding : 'base64'}, (err)=>{
        err ? console.log(err) : console.log('File created');
    });
}

function stickerCreator (image) {
    const sticker = new Sticker(image ,{
        pack : 'My Pack',
        author : '@TowelBot',
        type : StickerTypes.FULL,
        id : '12345',
        quality : 50,
        background : '#000000'
    });

    sticker.toFile('sticker.webp');
}

module.exports = {stickerCreator, base64Decoder};