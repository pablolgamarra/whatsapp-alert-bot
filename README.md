# Whatsapp Alert Bot - Webhook Notifier

Ligthweight Node.js application that sends **automated alerts via Whatsapp**, built for easy integration to **external monitoring systems** like **[Zabbix](https://www.zabbix.com/)**, or any service that allow sending **webhook HTTP calls**.

This project uses [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) to interface with WhatsApp Web through Puppeteer – no official API required.

## ⚠️ Important Advice

> WhatsApp **does not officially support bots or unofficial clients**.  
> This app relies on browser automation (via Puppeteer) to interact with WhatsApp Web.  
> Use at your own risk — **accounts may be restricted or banned**. Avoid using a personal or critical WhatsApp account.

## Features

-   🔗 **WhatsApp Web connection** via QR code
-   📡 **Webhook listener** for receiving alerts from external systems
-   💬 **Automated message dispatch** to configured groups or contacts
-   ⚙️ **Configurable endpoints and recipients** via a web UI
-   🎨 Clean HTML interface with [MVP.css](https://andybrewer.github.io/mvp/)
-   🧱 Modular architecture for scalability
-   🐳 Supports Docker and Dev Containers for quick setup

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

## Development & Deployment

This project includes:

docker-compose.yaml

Dockerfile

.devcontainer/ setup for VSCode Dev Containers

⚙️ Deployment instructions will be added soon.

## How to Deploy and Run this project on your own system

Writing pending

## Roadmap

-   Auth system for settings panel

-   Recipient editor via UI

-   Template support per endpoint

-   Persistent database storage

-   CI/CD setup with GitHub Actions

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners. Also it is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## 📄 License

This project is licensed under the MIT License.

It also includes use of whatsapp-web.js, which is licensed under Apache 2.0.

## Author

Developed by [Pablo Luis Gamarra](https://github.com/pablolgamarra)
