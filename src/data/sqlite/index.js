import sqlite from 'sqlite3';
import {initializeDb} from '../migrations.js';

const {Database} = sqlite;

const db = new Database('data/persistance/botConfigs.db', (err)=>{
    if(err){
        console.log(`Error opening DB -> ${err}`);
        return null
    }
});

try{
    const dbInitialized = await initializeDb(db);
}catch(error){
    throw Error(`DB Initialize error in sqlite index. -> ${error}`);
}

// SELECT
export function makePromiseQuery(query, params = []){
    return new Promise((resolve, reject)=>{
        try{
            db.all(query, params, (error, rows)=>{
                error ? reject(error) : resolve(rows);
            });
            
        }catch(e){
            reject (e)
        }
    })
}

// INSERT, UPDATE, DELETE
// SHOULD CHANGE SQLITE LIBRARY, BUT IDGAF
export function makePromiseRun(query, params = []){
    return new Promise((resolve, reject) => {
		try {
			db.run(query, params, function (error) {
                console.log(this)
				error ? reject(error) : resolve({ lastId: this.lastID, changes: this.changes });
			});
		} catch (e) {
			reject(e);
		}
	});
}

export default db;