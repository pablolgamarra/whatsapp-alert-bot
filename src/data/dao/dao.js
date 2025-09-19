import { TABLE_NAMES } from "../migrations.js";
import db, { makePromiseQuery, makePromiseRun } from "../sqlite/index.js";

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
        let ssql;

        if (filter && filter.length > 0) {
            ssql = `select t1.url, t1.alias, t3.name, concat(t3.chat_id,'@', t4.postfix) as chat_id
                            from ${t1} as t1
                            join ${t2} as t2 
                            on t1.id = t2.endpoint_id
                            join ${t3} as t3
                            on t3.id = t2.recipient_id
                            left join ${t4} as t4 
                            on t3.chat_type_id = t4.id ${filter};`;
        } else {
            ssql = `select t1.url, t1.alias, t3.name, concat(t3.chat_id,'@', t4.postfix) as chat_id
                            from ${t1} as t1
                            join ${t2} as t2 
                            on t1.id = t2.endpoint_id
                            join ${t3} as t3
                            on t3.id = t2.recipient_id
                            left join ${t4} as t4 
                            on t3.chat_type_id = t4.id `;
        }

        const rows = await makePromiseQuery(ssql);
        const allEndpoints = parseRowsToEndpointObj(rows);
        return allEndpoints;
    }catch(e){
        throw `Error retrieving endpoints -> ${e}`;
    }
}

export async function getRecipients(filter) {
    try{
        let ssql;

		if (filter && filter.length > 0) {
			ssql = `select t1.url, t1.alias, t3.name, concat(t3.chat_id,'@', t4.postfix) as chat_id
                            from ${t1} as t1
                            join ${t2} as t2 
                            on t1.id = t2.endpoint_id
                            join ${t3} as t3
                            on t3.id = t2.recipient_id
                            left join ${t4} as t4 
                            on t3.chat_type_id = t4.id ${filter};`;
		} else {
			ssql = `select t1.url, t1.alias, t3.name, concat(t3.chat_id,'@', t4.postfix) as chat_id
                            from ${t1} as t1
                            join ${t2} as t2 
                            on t1.id = t2.endpoint_id
                            join ${t3} as t3
                            on t3.id = t2.recipient_id
                            left join ${t4} as t4 
                            on t3.chat_type_id = t4.id `;
		}
        const rows = await makePromiseQuery(ssql);
        const allRecipients = parseRowsToRecipientsObj(rows);
        return allRecipients;
    }catch(e){
        throw `Error retrieving recipients -> ${e}`;
    }
}

export async function insertEndpoint(obj){
    try{
        makePromiseRun("BEGIN TRANSACTION");
        
        const insertEndpointSQL= `INSERT INTO ${t1} (url, alias) VALUES(?, ?)`;
        const insertEndpointRs = await makePromiseRun(insertEndpointSQL, [obj.webhook_endpoint, obj.webhook_alias]);
        const endpointId = insertEndpointRs.lastId;

        for(const recipient of obj.recipients){
            let recipientId = null;
            const chatId = recipient.chatId.split('@')[0];
            const chatPostfix = recipient.chatId.split('@')[1];

            //Check if recipient is registered on db already
            const checkRecipientExistsSQL = `SELECT id FROM ${t3} WHERE chat_id = ? AND name = ?`;
            const checkRecipientExistRs = await makePromiseQuery(checkRecipientExistsSQL, [chatId, recipient.name]);

            //Insert recipient if not exist
            if (checkRecipientExistRs.length > 0) {
				recipientId = checkRecipientExistRs[0].id;
			} else {
				const getChatTypeIdSQL = `SELECT id FROM ${t4} WHERE postfix = ?`;
				const chatTypeRs = await makePromiseQuery(getChatTypeIdSQL, [chatPostfix]);

                if(chatTypeRs.length < 0 || chatTypeRs === null){
                    throw Error(`Chat Type Id not found. Chat Postfix: ${chatPostfix}`);
                }

				const chatTypeId = chatTypeRs[0].id;

				const insertRecipientSQL = `INSERT INTO ${t3} (name, chat_id, chat_type_id) VALUES (?, ?, ?)`;
				const insertRecipientRs = await makePromiseRun(insertRecipientSQL, [recipient.name, chatId, chatTypeId]);

				recipientId = insertRecipientRs.lastId;
			}

			//Create relation of endpoint and recipients
			const endpointRecipientRelSQL = `INSERT INTO ${t2} (endpoint_id, recipient_id) VALUES (?, ?)`;
			await makePromiseRun(endpointRecipientRelSQL, [endpointId, recipientId]);
        }

        await makePromiseRun("COMMIT");

        return {
            success: true,
            endpointId: endpointId,
            message: `Correctly insertion`
        }

    }catch(e){
        await makePromiseRun("ROLLBACK");
        throw Error(`Error inserting object to DB -> ${e}`)
    }
}

export async function updateEndpoint(obj) {
	try {
		await makePromiseRun('BEGIN TRANSACTION');

        const getEndpointIdSQL = `SELECT id from ${t1} WHERE url=?`;
        const getEndpointIdRs = await makePromiseQuery(getEndpointIdSQL, [obj.webhook_endpoint]);
        
        if (getEndpointIdRs.length == 0 || getEndpointIdRs == null) {
			throw new Error('Endpoint not found');
		}

		const endpointId = rowEndpoint[0].id;

		const updateEndpointSQL = `UPDATE ${t1} SET url = ?, alias = ? WHERE id = ?`;
		await makePromiseRun(updateEndpointSQL, [obj.webhook_endpoint, obj.webhook_alias, endpointId]);

        const deleteOldRelationsSQL = `DELETE FROM ${t4} WHERE endpoint_id = ?`;
        await makePromiseRun(deleteOldRelationsSQL,[endpointId]);

		for (const recipient of obj.recipients) {
			let recipientId;
			const chatId = recipient.chatId.split('@')[0];
			const postfix = recipient.chatId.split('@')[1];

			//Check if recipient is registered on db already
			const checkRecipientExistsSQL = `SELECT id FROM ${t3} WHERE chat_id = ? AND name = ?`;
			const checkRecipientExistRs = await makePromiseQuery(checkRecipientExistsSQL, [chatId, recipient.name]);

			//Insert recipient if not exist
			if (checkRecipientExistRs.length > 0) {
				recipientId = recipientExist[0].id;
			} else {
				const getChatTypeIdSQL = `SELECT id FROM ${t4} WHERE postfix = ?`;
				const chatTypeRs = await makePromiseQuery(getChatTypeIdSQL, [chatPostfix]);

				if (chatTypeRs.length < 0 || chatTypeRs === null) {
					throw Error(`Chat Type Id not found. Chat Postfix: ${chatPostfix}`);
				}

				const chatTypeId = chatTypeRs[0].id;

				const insertRecipientSQL = `INSERT INTO ${t3} (name, chat_id, chat_type_id) VALUES (?, ?, ?)`;
				const insertRecipientRs = await makePromiseRun(insertRecipientSQL, [
					recipient.name,
					chatId,
					chatTypeId,
				]);

				recipientId = insertRecipientRs.lastId;
			}

			//Create relation of endpoint and recipients
			const endpointRecipientRelSQL = `INSERT INTO ${t2} (endpoint_id, recipient_id) VALUES (?, ?)`;
			await makePromiseRun(endpointRecipientRelSQL, [insertedEndpId, recipientId]);
		}

		await makePromiseRun('COMMIT');

		return {
			success: true,
			endpointId: endpointId,
			message: `Correctly updated`,
		};
	} catch (e) {
        await makePromiseRun("ROLLBACK");
		throw Error(`Error updating endpoint in DB -> ${e}`);
	}
}

export async function deleteEndpoint(obj) {
    try{
        await makePromiseRun("BEGIN TRANSACTION");
        
        const getEndpointIdSQL = `SELECT id from ${t1} WHERE url=?`;
        const rsEndpoint = await makePromiseQuery(getEndpointIdSQL, [obj.webhook_endpoint]);
        
        if(rsEndpoint == null || rsEndpoint.length < 0){
            throw Error(`Endpoint not found`);
        }

        const endpointId = rsEndpoint[0].id;

        const getRelatedRelsSQL = `SELECT id from ${t2} WHERE endpoint_id = ?`;4
        const getRelatedRelsRs = await makePromiseRun(getRelatedRelsSQL, [endpointId]);

        if(getRelatedRelsRs.length > 0){
            for(const rel of getRelatedRelsRs){
                const deleteRelatedRelsSQL = `DELETE FROM ${t2} WHERE id = ?`;
                await makePromiseRun(deleteRelatedRelsSQL, [rel.id]);
            }
        }
        
        const deleteEndpointSQL=`DELETE FROM ${t1} WHERE id=?`;
        await makePromiseRun(deleteEndpointSQL, [endpointId]);
        
        await makePromiseRun("COMMIT")
    }catch(e){
        await makePromiseRun("ROLLBACK");
        throw Error(`Error deleting endpoint from DB -> ${e}`);
    }
}
