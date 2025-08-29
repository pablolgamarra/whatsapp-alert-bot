import express from 'express';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

//API ENDPOINTS
Router.get('/api/qr', (req, res) => {
    const {qr} = getQR();

    res.json({ "qr": qr});
});

Router.get('/api/qr-count', (req, res) => {
    const {qrCount} = getQR();

    res.json({ "count": qrCount});
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

Router.get('/api/recipients', (_, res) => {
	const webhooksConfigFilePath = path.join(__dirname, '../bot/config/webhooks/endpoints.json');

	try {
		const webhooksConfig = JSON.parse(fs.readFileSync(webhooksConfigFilePath, 'utf8'));

		const allRecipients = webhooksConfig.map((element) => ({
			endpoint: element.webhook_endpoint,
			recipients: element.recipients,
		}));

		return res.status(200).json(allRecipients);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: `Configuration file not found` });
	}
});

Router.get('/api/endpoints', (_, res) => {
	const webhooksConfigFilePath = path.join(__dirname, '../bot/config/webhooks/endpoints.json');

	try {
		const webhooksConfig = JSON.parse(fs.readFileSync(webhooksConfigFilePath, 'utf8'));

		const allEndpoints = webhooksConfig.map((element) => ({
			endpoint: element.webhook_endpoint,
			alias: element.webhook_alias,
		}));

		return res.status(200).json(allEndpoints);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: `Configuration file not found` });
	}
});

Router.post('/api/recipients', (req, res) => {
	const newWebhook = req.body;

	if (!newWebhook?.webhook_endpoint || !newWebhook.recipients) {
		return res.status(400).json({ error: 'Datos incompletos' });
	}

	const configPath = path.join(__dirname, '../bot/config/webhooks/endpoints.json');

	try {
		const currentData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

		// Verificar si ya existe
		const alreadyExists = currentData.find((w) => w.webhook_endpoint === newWebhook.webhook_endpoint);
		if (alreadyExists) {
			return res.status(409).json({ error: 'Este endpoint ya existe' });
		}

		// Agregar y guardar
		currentData.push({
			webhook_endpoint: newWebhook.webhook_endpoint,
			webhook_alias: newWebhook.webhook_alias,
			recipients: newWebhook.recipients,
		});

		fs.writeFileSync(configPath, JSON.stringify(currentData, null, 2), 'utf8');

		res.status(200).json({ status: 'Guardado exitosamente' });
	} catch (err) {
		console.error('Error al guardar receptor', err);
		res.status(500).json({ error: 'No se pudo guardar el receptor' });
	}
});

//WEBHOOKS ENDPOINTS
Router.post('/webhook/:source', async (req, res) => {
	const { source } = req.params;

	const data = req.body;

	//Return error if required params are undefined
	if (!source) {
		return res.status(400).json({ error: 'Endpoint not configured' });
	}

	if (!data.message) {
		return res.status(400).json({ error: 'The message parameter is required' });
	}

	const webhooksConfigFilePath = path.join(__dirname, '../bot/config/webhooks/endpoints.json');
	let config;

	try {
		config = JSON.parse(fs.readFileSync(webhooksConfigFilePath, 'utf8'));
	} catch (e) {
		return res.status(500).json({ error: `Webhook configuration not found for: ${source}` });
	}

	const webhook = config.find((obj) => obj.webhook_endpoint === source);
	if (!webhook) {
		return res.status(500).json({ error: `Webhook configuration not found for: ${source}` });
	}

	const alertRecipients = webhook.recipients;
	if (!alertRecipients || !Array.isArray(alertRecipients) || alertRecipients.length === 0) {
		return res.status(404).json({ error: `Recipients for ${source} not configured` });
	}

	try {
		for (const recipient of alertRecipients) {
			console.log(recipient.chatId);
			// await sendMessage(recipient, data.message);
		}
		res.status(200).json({ status: 'Message sent to all recipients' });
	} catch (err) {
		console.error('❌ Error sending message:', err);
		res.status(500).json({ error: 'Error sending message' });
	}
});

// FRONTEND ENDPOINTS
Router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

Router.get('/qr-code', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/qr-code.html'));
});

Router.get('/settings', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/settings.html'));
});

export default Router;
