const messages = require('../config/botMessages/messages.json')

module.exports = {
    getMessage: (index) => {
        return messages[index].body
    }
}