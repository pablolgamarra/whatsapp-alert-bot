# Etapa base
FROM node:18-slim

# Instalar dependencias necesarias para puppeteer / whatsapp-web.js
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear app directory
WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Expone el puerto del servidor Express
EXPOSE 3000

# Comando por defecto: inicia el servidor y luego el bot
CMD ["node", "./bin/web/start.js"]
