require('dotenv').config({ path: 'server/config/server.env' });
const mysql = require('mysql2');
const util = require('util');

const db = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.getConnection((error, connection) => {
    if (error) {
        console.log(`Error on DB Connection. ${error}`);
    } else if (connection) {
        connection.release();
        console.log('Connection to DB Successfull');
    }
});

db.execute = util.promisify(db.execute);

module.exports = db;