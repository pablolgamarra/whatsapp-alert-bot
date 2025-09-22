import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const validateJSONReqs = (req, res, next) => {
	if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
		if (req.get('Content-Type') !== 'application/json') {
			return res.status(400).json({ error: 'Content-Type must be application/json' });
		}
	}

	next();
};

//Error handling middleware
export const handleError = (err, req, res, next) => {
	console.error('API ERROR', err);

	if (err) {
		switch (err.name) {
			case 'ValidationError':
				return res.status(400).json({ error: err.message });
			case 'DatabaseError':
				return res.status(500).json({ error: 'Database error ocurred' });
			default:
				return res.status(500).json({ error: 'Internal server error' });
		}
	}

	next();
};

//Request Logger
export const logRequest = (req, res, next) => {
	console.log(`Time: ${Date.now()}. New ${req.method} request to ${req.originalUrl}`);
	next();
};

//Serve static files
export const staticFilesMiddleware = express.static(path.join(__dirname, '../../public'), {
	maxAge: '1d', // Cache for 1 day
	etag: true,
	lastModified: true,
});
