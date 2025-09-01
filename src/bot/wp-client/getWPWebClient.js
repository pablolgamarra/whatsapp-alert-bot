import path from 'node:path';
import { fileURLToPath } from 'url';
import webWp from 'whatsapp-web.js';
const { Client, LocalAuth } = webWp;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const authPath = path.join(__dirname, '../../../auth/bot');
const cachePath = path.join(__dirname, '../../../cache/bot');

export default function getWAWebClient() {
	return new Client({
		authStrategy: new LocalAuth({dataPath:authPath}),
        webVersionCache: {type: 'local', path: cachePath},
		puppeteer: {
			args: ['--no-sandbox', '--disable-setuid-sandbox'], 
			ignoreHTTPSErrors: true,
			dumpio: false,
		},
	});
}
