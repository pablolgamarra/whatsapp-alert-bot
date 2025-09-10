import {Database} from 'sqlite3';
import initializeDb from '../migrations';

const db = new Database('../../../data/persistance', (err)=>{
    if(err){
        console.log(`Error opening DB -> ${err}`);
        return null
    }
});

initializeDb(db);

export default db;