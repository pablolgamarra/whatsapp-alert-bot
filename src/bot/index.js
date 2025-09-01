import { handleAuth, handleAuthFailed } from './handlers/handleAuth.js';
import { handleClientDisconnection } from './handlers/handleClientDisconnection.js';
import { handleMessage } from './handlers/handleMessage.js';
import { handleQr } from './handlers/handleQr.js';
import { handleReady } from './handlers/handleReady.js';
import getWAWebClient from './wp-client/getWPWebClient.js';

const wpClient = getWAWebClient();

wpClient.on('qr', handleQr);
wpClient.on('auth_failure', handleAuthFailed);
wpClient.on('authenticated', handleAuth);
wpClient.on('ready', handleReady);
wpClient.on('message', handleMessage);
wpClient.on('disconnected', handleClientDisconnection);

export default wpClient;
