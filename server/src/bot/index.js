import { handleAuth } from './handlers/handleAuth.js';
import { handleMessage } from './handlers/handleMessage.js';
import { handleQr } from './handlers/handleQr.js';
import { handleReady } from './handlers/handleReady.js';
import getWAWebClient from './wp-client/getWPWebClient.js';

const wpClient = getWAWebClient();

wpClient.on('qr', handleQr);

wpClient.on('authenticated', handleAuth);

wpClient.on('ready', handleReady);

wpClient.on('message', handleMessage);

export default wpClient;
