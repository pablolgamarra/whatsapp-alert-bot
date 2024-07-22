const { Client, LocalAuth, AuthStrategy } = require('whatsapp-web.js');

module.exports = {
    getWAClient: () => {
        return new Client(
            {AuthStrategy: new LocalAuth()}
        );
    }
}