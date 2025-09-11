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

export default db;