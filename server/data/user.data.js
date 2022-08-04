const db = require('./connect.data');

module.exports = {
    getUsers: async () => {
        return [rows, fields] = await db.execute('select * from users')
    },
    getUserById: async (id) => {
        db.query(`select * from users where id = id`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return result;
            }
        })
    }
}