const db = require('./connect.data');

module.exports = {
    getUsers: async () => {
        return [rows, fields] = db.execute('select * from users')
    },
    getUserById: async (Id) => {
        try {

        } catch (e) {
            if (e) console.log('Error on QUERY.')
        }
        return [rows, fields] = db.execute(`select * from users where Id = ${Id}`);
    }
}