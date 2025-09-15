import { TABLE_NAMES } from "../migrations.js";
import db from "../sqlite/index.js";

const t1 = TABLE_NAMES.ENDPOINTS_TABLE_NAME;
const t2 = TABLE_NAMES.ENDPOINT_RECIPIENTS_TABLE_NAME;
const t3 = TABLE_NAMES.RECIPIENTS_TABLE_NAME;
const t4 = TABLE_NAMES.CHAT_TYPES_TABLE_NAME;


function parseRowsToEndpointObj(rows){
    try{
        const allEndpoints = {};

        rows.forEach((row) => {
            const key = row.url;

            if (!allEndpoints[key]) {
                allEndpoints[key] = {
                    webhook_endpoint: row.url,
                    webhook_alias: row.alias,
                    recipients: [],
                };
            }

            const dupRecipient = allEndpoints[key].recipients.find((r) => r.chatId == row.chat_id);

            if (!dupRecipient) {
                allEndpoints[key].recipients.push({ name: row.name, chatId: row.chat_id });
            }
        });

        return Object.values(allEndpoints);
    }catch(e){
        throw Error(`Error parsing rows to endpoints object -> ${e}`)
    }
}

function parseRowsToRecipientsObj(rows){
    try{
        const allRecipients = {};

        rows.forEach((row)=>{
            const key = row.url;

            if(!allRecipients[key]){
                allRecipients[key] = {
					endpoint: row.url,
					recipients: [],
				};
            }

            const dupRecipient = allEndpoints[key].recipients.find((r) => r.chatId == row.chat_id);

            if (!dupRecipient) {
                allEndpoints[key].recipients.push({ name: row.name, chatId: row.chat_id });
            }

        })

        return Object.values(allRecipients);
    }catch(e){
        throw Error(`Error parsing rows to recipients object -> ${e}`);
    }
}

export function getEndpointsWithRecipients (filter){
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
                reject(error);
            }else{
                try{
                    resolve(rows);                
                }catch(e){
                    reject(error);
                }
            }
        })
    })
}

export async function getEndpoints(filter){
    try{
        const rows = await getEndpointsWithRecipients(filter);
        const allEndpoints = parseRowsToEndpointObj(rows);
        return allEndpoints;
    }catch(e){
        throw `Error retrieving endpoints -> ${e}`;
    }
}

export async function getRecipients(filter) {
    try{
        const rows = await getEndpointsWithRecipients(filter);
        const allRecipients = parseRowsToRecipientsObj(rows);
        return allRecipients;
    }catch(e){
        throw `Error retrieving recipients -> ${e}`;
    }
}

export function insertEndpoint(obj){
    return new Promise((resolve, reject)=>{
        reject('Not Implemented');
    })
}

export function updateEndpoint(obj) {
	return new Promise((resolve, reject) => {
		reject('Not Implemented');
	});
}

export function deleteEndpoint(obj) {
	return new Promise((resolve, reject) => {
		reject('Not Implemented');
	});
}
