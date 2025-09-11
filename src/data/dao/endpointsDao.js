import { TABLE_NAMES } from "../migrations.js";
import db from "../sqlite/index.js";

const t1 = TABLE_NAMES.ENDPOINTS_TABLE_NAME;
const t2 = TABLE_NAMES.ENDPOINT_RECIPIENTS_TABLE_NAME;
const t3 = TABLE_NAMES.RECIPIENTS_TABLE_NAME;
const t4 = TABLE_NAMES.CHAT_TYPES_TABLE_NAME;


export function getAllEndpoints (filter){
    let ssql;

    if(filter && filter.length > 0){
        ssql = `select t1.url, t1.alias, t3.name, concat(t3.chat_id,'@', t4.postfix) as chat_id
                    from ${t1} as t1
                    join ${t2} as t2 
                    on t1.id = t2.endpoint_id
                    join ${t3} as t3
                    on t3.id = t2.recipient_id
                    left join ${t4} as t4 
                    on t3.chat_type_id = t4.id ${filter};`;
    }else{
        // ssql= `SELECT name FROM sqlite_master WHERE type='table';`
        ssql = `select t1.url, t1.alias, t3.name, concat(t3.chat_id,'@', t4.postfix) as chat_id
                    from ${t1} as t1
                    join ${t2} as t2 
                    on t1.id = t2.endpoint_id
                    join ${t3} as t3
                    on t3.id = t2.recipient_id
                    left join ${t4} as t4 
                    on t3.chat_type_id = t4.id `;
    }
  
    return new Promise((resolve, reject) =>{
        db.all(ssql,(error, rows) => {
            if (error){
                console.log(ssql);
                 reject(error);
            }else{
                // const allEndpoints = rows.map((row)=>(
                //     {
                //         webhook_endpoint: row.url,
                //         webhook_alias: row.alias,
                //         recipients: [],
				//     }
                // ));
                resolve(rows);                
            }
        })
    })
}