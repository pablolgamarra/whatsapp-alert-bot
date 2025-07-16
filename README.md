# Node Bot For Whatsapp - Webhooks Zabbix Integration

## Description

This project is a modular and scalable WhatsApp bot built using `whatsapp-web.js`. The bot connects to WhatsApp via a QR code and provides functionality for handling messages and other interactions. This branch contains the 'webhook listener' functionality, that brings the capability of sending alerts from Zabbix or another monitoring system to a whatsapp number or group.

## Project Structure

```
/server
-/bin               # Code executers
  --/bot            # Contains code to run the whatsapp-web.js client
  --/main           # Contains code to run also the bot and the expressjs webserver
  --/web            # Contains code to run the expressjs server

-/src               # Source code
  --/bot            # Whatsapp-webjs client initialize and config
  --/public         # Static files
  --/routes         # Expressjs routes
  --/store          # Temp storage for puppetter's generated QR codes
  --/util           # Project utils
  --/web            # Expressjs initilization
```

## Features

-   **WhatsApp Web Connection**: Uses `whatsapp-web.js` to connect via QR code.
-   **QR Code Handling**: Generates and displays QR codes for authentication.
-   **Modular Design**: Event handlers are separated into dedicated files for easy maintenance and scalability.
-   **WebHook Integration**: Fully configurable webhook endpoints to automate message sending.

---

## Docker and DevContainers

This branch got a `.devcontainer` folder that contains all the development container logic and also has a docker-compose.yaml and a Dockerfile to make the deployment easier.

## How to Deploy and Run this project on your own system

Writing pending

## Next Steps

1. **Expand Message Handling**: Add more advanced responses, commands, and automation.
2. **Develop a REST API**: Create an Express API to allow external applications to send messages.
3. **Build a UI (Optional)**: Integrate a front-end interface for bot management.

This structure ensures flexibility for future improvements while maintaining clean and organized code. 🚀

### To Add

https://andybrewer.github.io/mvp -> Estilos css en el front
