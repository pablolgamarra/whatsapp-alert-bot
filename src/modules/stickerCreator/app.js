const sharp = require('sharp');
const client = require('../../../index.js');

let image, buff;
async function downloadMsgMedia(msg){
    try {
        const {data} = await msg.downloadMedia();
        buff = Buffer.from(data, 'base64');
        image = await sharp(buff).resize(512,512).toFile('output.webp', (err)=>{
            console.log(err);
        });
        console.log('Sticker Created');
    } catch (error) {
        if(error){
            console.log(`HA OCURRIDO UN ERROR AL DESCARGAR LA IMAGEN/VIDEO.\nError: ${err}`);
        }            
    }
}

module.exports = {downloadMsgMedia};