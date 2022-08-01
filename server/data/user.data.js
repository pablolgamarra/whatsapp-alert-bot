const db = require('./connectdb.data');

module.exports = {
    getUsers: ()=>{
        db.query('select * from users', (err, result) =>{
            if(err){
                console.log(err);
            }else{
                const users = result;
                return users;
            }
        })
    },
    getUserById: (id)=>{
        db.query(`select * from users where id = id`, (err, result) =>{
            if(err){
                console.log(err);
            }else{
                const users = result;
                return users;
            }
        })
    }
}