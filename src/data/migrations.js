const TABLE_NAMES={
    'ENDPOINTS_TABLE_NAME':'endpoints',
    'RECIPIENTS_TABLE_NAME':'recipients',
    'CHAT_TYPES_TABLE_NAME':'chat_types',
    'ENDPOINT_RECIPIENTS_TABLE_NAME':'endpoint_recipients'
}


const initializeDb = async (db) => {
    const initSQL = `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.ENDPOINTS_TABLE_NAME}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url VARCHAR(100) NOT NULL,
        alias VARCHAR(250) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.RECIPIENTS_TABLE_NAME}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        chat_id VARCHAR(100) NOT NULL,
        chat_type_id INTEGER NOT NULL,
        FOREIGN KEY (chat_type_id) REFERENCES ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        postfix VARCHAR(5)
    );

    CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.ENDPOINT_RECIPIENTS_TABLE_NAME}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endpoint_id INTEGER,
        recipient_id INTEGER,
        FOREIGN KEY (endpoint_id) REFERENCES ${TABLE_NAMES.ENDPOINTS_TABLE_NAME}(id) ON DELETE CASCADE,
        FOREIGN KEY (recipient_id) REFERENCES ${TABLE_NAMES.RECIPIENTS_TABLE_NAME}(id) ON DELETE CASCADE
    );
    
    INSERT INTO ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME} (name, postfix) values ('Group', 'g.usx');
    `;
    
    return new Promise((resolve, reject) => {
        db.exec(initSQL, (error)=>{
            if(error){
                reject(error)
            }
            resolve('DB Initialized');
        })
    })
}

export {initializeDb, TABLE_NAMES};



// CREATE TABLE IF NOT EXISTS endpoINTEGERs(
//         id SERIAL PRIMARY KEY,
//         url VARCHAR(100) NOT NULL,
//         alias VARCHAR(250) NOT NULL
//     );

//     CREATE TABLE IF NOT EXISTS recipients(
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         chatId VARCHAR(100) NOT NULL,
// 		chat_type_id INTEGER,
//         FOREIGN KEY (chat_type_id) REFERENCES chat_types(id) ON DELETE CASCADE
//     );

//     CREATE TABLE IF NOT EXISTS chat_types(
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         postfix VARCHAR(5)
//     );

//     CREATE TABLE IF NOT EXISTS endpoINTEGER_recipients(
//         id SERIAL PRIMARY KEY,
// 		endpoINTEGER_id INTEGER,
// 		recipient_id INTEGER,
//         FOREIGN KEY (endpoINTEGER_id) REFERENCES endpoINTEGERs(id) ON DELETE CASCADE,
//         FOREIGN KEY (recipient_id) REFERENCES recipients(id) ON DELETE CASCADE
//     );