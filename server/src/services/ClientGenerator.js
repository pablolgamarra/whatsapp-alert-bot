const { Client, LocalAuth } = require('whatsapp-web.js');

const getWAClient = ()=>{
    return new Client(
        {AuthStrategy: new LocalAuth()}
    );
}
module.exports = getWAClient