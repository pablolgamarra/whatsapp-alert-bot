import webWp from 'whatsapp-web.js';
const { Client, LocalAuth } = webWp;

export default function getWAWebClient() {
	return new Client({ authStrategy: new LocalAuth() });
}
