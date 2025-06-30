import express from 'express';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

import sendMessage from '../bot/handlers/sendMessage.js';
import { getQR } from '../store/qr.js';
const Router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Request Logger
Router.use((req, res, next) => {
	console.log('Time:', Date.now());
	console.log(`New ${req.method} request -> ${req.originalUrl}`);
	next();
});

//Reconocer JSON's
Router.use(express.json());

Router.get('/api/qr', (req, res) => {
	res.json({ qr: getQR() });
});

Router.get('/api/messages', (req, res) => {
	const filePath = path.join(__dirname, '../bot/config/botMessages/messages.json');
	try {
		const messages = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		console.log(messages);
		res.json({ messages });
	} catch (err) {
		console.error('Error leyendo messages.json', err);
		res.status(500).json({ error: 'No se pudieron obtener los mensajes.' });
	}
});

Router.post('/webhook/zabbix', (req, res) => {
	const data = req.body;

	console.log('Webhook llamado -> ', data);

	if (!data.message) {
		return res.status(400).json({ error: 'Parámetros requeridos: to y message' });
	}
	try {
		sendMessage(data.message);
		res.status(200).json({ status: 'enviado' });
	} catch (err) {
		console.error('❌ Error al enviar mensaje:', err);
		res.status(500).json({ error: 'No se pudo enviar el mensaje' });
	}
});

// FRONTEND ENDPOINTS
Router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

Router.get('/messages', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/messages.html'));
});

export default Router;
