require('dotenv').config({path:'server/config/server.env'});
const mysql = require('mysql');
const util = require('util');

const db = mysql.createPool({
    host : process.env.HOST,
    database : process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.getConnection((error, connection) =>{
    if(error){
        console.log(`Error on DB Connection. ${e}`);
    }else if(connection) {
        connection.release();
        console.log('Connection to DB Successfull');
    }
});

db.query = util.promisify(db.query).bind(db);

module.exports = db;