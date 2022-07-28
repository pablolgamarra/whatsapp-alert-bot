const { Client, LocalAuth } = require('whatsapp-web.js');

module.exports = {
    getWAClient: () => {
        return new Client({
            authStrategy: new LocalAuth()
        })
    }
}