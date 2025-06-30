import express from 'express';
import fs from 'node:fs';

const Router = express.Router();
Router.use(express.json());

Router.get('/api/qr', (req, res) => {
	res.json({ qr: `${fs.readFileSync('QRCode.txt')}` });
});

Router.get('/api/messages', (req, res) => {
	res.json({ messages: `${require('../config/botMessages/messages.json')}` });
});

Router.post('/webhook/zabbix', (req, res) => {
	const data = req.body;

	console.log('Webhook llamado -> ', data);

	res.status(200).send('OK');
});

export default Router;
