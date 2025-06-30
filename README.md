# Node Bot For Whatsapp - Project Overview

## Description

This project is a modular and scalable WhatsApp bot built using `whatsapp-web.js`. The bot connects to WhatsApp via a QR code and provides functionality for handling messages and other interactions. The project is structured to allow easy expansion, including API integration and front-end development.

## Project Structure

```
/node_wp_bot
-/front             # UI (currently on hold, future integration planned)
-/server            # Server handling the bot and future APIs
  --/bot            # Core WhatsApp bot logic
    ---/wp-client   # WhatsApp client module
      ---- getWpClient.js   # Initializes the WhatsApp client
    ---/handlers    # Event and action handlers
      ---- messageHandler.js  # Handles incoming messages
      ---- qrHandler.js       # Manages QR codes for authentication
    ---index.js    # Main bot configuration
```

## Features

-   **WhatsApp Web Connection**: Uses `whatsapp-web.js` to connect via QR code.
-   **QR Code Handling**: Generates and displays QR codes for authentication.
-   **Message Handling**: Responds to incoming messages with predefined logic.
-   **Modular Design**: Event handlers are separated into dedicated files for easy maintenance and scalability.
-   **API Integration (Optional)**: A REST API can be added for external interaction with the bot.

## Current Handlers

### QR Handler (`qrHandler.js`)

```javascript
import qrCode from 'qrcode-terminal';

export function handleQr(qr) {
	console.log('QR Code Received');
	qrCode.generate(qr, { small: true });
}
```

### Message Handler (`messageHandler.js`)

```javascript
export function handleMessage(msg) {
	console.log(`Message received: ${msg.body}`);
	if (msg.body.toLowerCase() === 'hello') {
		msg.reply('Hello! How can I assist you?');
	}
}
```

## Next Steps

1. **Expand Message Handling**: Add more advanced responses, commands, and automation.
2. **Develop a REST API**: Create an Express API to allow external applications to send messages.
3. **Build a UI (Optional)**: Integrate a front-end interface for bot management.

This structure ensures flexibility for future improvements while maintaining clean and organized code. 🚀
