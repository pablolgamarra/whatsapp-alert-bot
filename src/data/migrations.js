const TABLE_NAMES={
    'ENDPOINTS_TABLE_NAME':'endpoints',
    'RECIPIENTS_TABLE_NAME':'recipients',
    'CHAT_TYPES_TABLE_NAME':'chat_types',
    'ENDPOINT_RECIPIENTS_TABLE_NAME':'endpoint_recipients'
}


const initializeDb = async (db) => {
    try{
        console.log('Initializing Database...');

        const statements = [
            `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.ENDPOINTS_TABLE_NAME}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    url VARCHAR(100) NOT NULL,
                    alias VARCHAR(250) NOT NULL
                )`,
                
                `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR(100) NOT NULL,
                    postfix VARCHAR(5)
                )`,

                `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.RECIPIENTS_TABLE_NAME}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR(255) NOT NULL,
                    chat_id VARCHAR(100) NOT NULL,
                    chat_type_id INTEGER NOT NULL,
                    FOREIGN KEY (chat_type_id) REFERENCES ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}(id) ON DELETE CASCADE
                )`,

                `CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.ENDPOINT_RECIPIENTS_TABLE_NAME}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    endpoint_id INTEGER,
                    recipient_id INTEGER,
                    FOREIGN KEY (endpoint_id) REFERENCES ${TABLE_NAMES.ENDPOINTS_TABLE_NAME}(id) ON DELETE CASCADE,
                    FOREIGN KEY (recipient_id) REFERENCES ${TABLE_NAMES.RECIPIENTS_TABLE_NAME}(id) ON DELETE CASCADE
                )`
        ];

        for(const statement of statements){
            await new Promise((resolve, reject) => {
                db.run(statement, (error)=>{
                    if(error){
                        console.log(`Error creating table. Statement -> ${statement}`);
                        reject(error);
                    }else{
                        console.log(`Table created`);
                        resolve();
                    }
                });
            });
        }

        await insertInitialData(db);

        console.log('✅ Database initialization completed successfully');
        return true;
    }catch(error){
        throw Error(`Error initializing Database. -> ${error}`)
    }
};

const insertInitialData = async (db) => {
    try{
        console.log(`Inserting initial data into database`);

        const checkExistingChatTypes = await new Promise((resolve, reject)=>{
            db.all(`SELECT COUNT(*) as count FROM ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME}`, (error, rows)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(rows[0].count);
                }
            });
        });

        if(checkExistingChatTypes === 0){
            const chatTypes = [
                ['Group', 'g.us'],
                ['Contact', 'c.us'],
                ['Broadcast', 'g.us']
            ];

            for(const [name, postfix] of chatTypes){
                await new Promise((resolve, reject) => {
                    db.run(
                        `INSERT INTO ${TABLE_NAMES.CHAT_TYPES_TABLE_NAME} (name, postfix) VALUES (?, ?)`,
                        [name, postfix],
                        function (error) {
                            if (error) {
                                console.log(`Error inserting chat type: ${name} -> ${error.message}`);
                                reject(error);
                            } else {
                                console.log(`Inserted chat type: ${name} ${postfix}`);
                                resolve();
                            }
                        },
                    );
                });
            }
        }else{
            console.log(`Chat types already exists`);
        }
    }catch(e){
        console.error('Error inserting initial data:', e);
		throw e;
    };
}

export {initializeDb, TABLE_NAMES};