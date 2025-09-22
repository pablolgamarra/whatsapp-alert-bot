import path from 'node:path';
import { fileURLToPath } from 'url';
import webWp from 'whatsapp-web.js';
const { Client, LocalAuth } = webWp;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const authPath = process.env.AUTH_PATH || path.join(__dirname, '../../../auth/bot');
const cachePath = process.env.CACHE_PATH || path.join(__dirname, '../../../cache/bot');

export default function getWAWebClient() {
	return new Client({
		authStrategy: new LocalAuth({clientId: 'Whatsapp-Bot', dataPath:authPath, rmMaxRetries: 3}),
		webVersionCache: {path: cachePath},
        deviceName: 'Bot Runner',
		puppeteer: {
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			ignoreHTTPSErrors: true,
			dumpio: false,
		},
        takeoverOnConflict: true
	});
}
