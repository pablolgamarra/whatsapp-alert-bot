const TABLE_NAMES={
    'ENDPOINTS_TABLE_NAME':'endpoints',
    'RECIPIENTS_TABLE_NAME':'recipients',
    'CHAT_TYPES_TABLE_NAME':'chat_types',
    'ENDPOINT_RECIPIENTS_TABLE_NAME':'endpoint_recipients'
}

const initializeDb = (db) => {
    const initSQL = `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.ENDPOINTS_TABLE_NAME}(
        id INT(8) PRIMARY KEY AUTO_INCREMENT,
        url VARCHAR(100) NOT NULL,
        alias VARCHAR(250) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.RECIPIENTS_TABLE_NAME}(
        id INT(8) PRIMARY KEY AUTO_INCREMENT,
        chatId VARCHAR(100) NOT NULL,
        FOREIGN KEY (chatTypeId) REFERENCES ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}(
        id INT(8) PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        postfix VARCHAR(5)
    );

    CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.ENDPOINT_RECIPIENTS_TABLE_NAME}(
        id INT(8) PRIMARY KEY AUTO_INCREMENT,
        FOREIGN KEY endpointId REFERENCES ${TABLE_NAMES.ENDPOINTS_TABLE_NAME}(id) ON DELETE CASCADE,
        FOREIGN KEY recipientId REFERENCES ${TABLE_NAMES.RECIPIENTS_TABLE_NAME}(id) ON DELETE CASCADE
    );`;
    
    const ps = db.prepare(initSQL);

    try{
        db.run(ps);
    }catch(e){
        console.error(`Error inicializando DB -> ${e}`);
    }
}

module.exports = {initializeDb, TABLE_NAMES};