import sqlite from 'sqlite3';
import {initializeDb} from '../migrations.js';
import path from 'path';
import fs from 'fs';

const { Database } = sqlite;

// SELECT
export function makePromiseQuery(query, params = []) {
	return new Promise((resolve, reject) => {
		try {
			if (process.env.NODE_ENV === 'development') {
				console.log(`Query: ${query}`, params.length > 0 ? `Params: ${JSON.stringify(params)}` : '');
			}

			db.all(query, params, (error, rows) => {
				if (error) {
					console.error(`Make promise query error: ${error.message}`);
					console.error(`Query: ${query}`);
					reject(error);
				} else {
					resolve(rows);
				}
			});
		} catch (e) {
			console.error(`Query exception -> `, e);
			reject(e);
		}
	});
}

// INSERT, UPDATE, DELETE
export function makePromiseRun(query, params = []) {
	return new Promise((resolve, reject) => {
		try {
			if (process.env.NODE_ENV === 'development') {
				console.log(`🔧 Run: ${query}`, params.length > 0 ? `Params: ${JSON.stringify(params)}` : '');
			}

			db.run(query, params, function (error) {
				if (error) {
					console.error(`Make promise run error: ${error.message}`);
					console.error(`Query: ${query}`);
					reject(error);
				} else {
					resolve({
						lastId: this.lastID,
						changes: this.changes,
					});
				}
			});
		} catch (e) {
			console.error(`Run exception -> `, e);
			reject(e);
		}
	});
}

export function closeDb() {
	return new Promise((resolve, reject) => {
		db.close((err) => {
			if (err) {
				console.error('Error closing database:', err);
				reject(err);
			} else {
				console.log('Database connection closed');
				resolve();
			}
		});
	});
}

process.on('SIGINT', async () => {
	console.log('\nShutting down gracefully...');
	try {
		await closeDb();
		process.exit(0);
	} catch (error) {
		console.error('Error during shutdown:', error);
		process.exit(1);
	}
});

process.on('SIGTERM', async () => {
	console.log('\nSIGTERM received, shutting down gracefully...');
	try {
		await closeDb();
		process.exit(0);
	} catch (error) {
		console.error('Error during shutdown:', error);
		process.exit(1);
	}
});

//Depends on execution environment
const getDbPath = () => {
	if (process.env.DB_PATH && process.env.DB_FILENAME) {
		return `${process.env.DB_PATH}${process.env.DB_FILENAME}`;
	}

    //Prod
	if (process.env.NODE_ENV === 'production' && fs.existsSync('/app/data')) {
		return `/app/data/persistance/${process.env.DB_FILENAME}`;
	} 

    //Development
	return 'data/persistance/botConfigs.db';
};

const dbPath = getDbPath();

const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
	console.log(`Created database directory: ${dbDir}`);
}

console.log(`Database path: ${dbPath}`);

const db = new Database(dbPath, (err) => {
	if (err) {
		console.error(`Error opening DB -> ${err}`);
		process.exit(1);
	} else {
		console.log(`Database connected successfully`);
	}
});

try {
	const dbInitialized = await initializeDb(db);
	console.log(`Database initialized successfully`);
} catch (error) {
	console.error(`DB Initialize error:`, error);
	process.exit(1);
}

export default db;
