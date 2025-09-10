import { TABLE_NAMES } from "../migrations";
import db from "../sqlite";

const t1 = TABLE_NAMES.ENDPOINTS_TABLE_NAME;

export function getAllEndpoints (filter){
    let ssql;

    if(filter && filter.length > 0){
        ssql = `SELECT * FROM ${t1} ${filter}`;
    }else{
        ssql= `SELECT * FROM ${t1}`;
    }
  
    return new Promise((resolve, reject) =>{
        db.all(ssql,(error, rows) => {
            if (error){
                 reject(error)
            }else{
                const allEndpoints = rows.map((row)=>(
                    {
                        webhook_endpoint: row.url,
                        webhook_alias: row.alias,
                        recipients: [],
				    }
                ));
                resolve(rows);                
            }
        })
    })
}