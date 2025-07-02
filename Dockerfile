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

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los package.json desde subcarpeta server
COPY server/package*.json ./server/

# Copiar el resto del código
COPY server ./

RUN useradd -m nodebot

RUN chown -R nodebot:nodebot /app

# Entrar a la carpeta y correr npm install
WORKDIR /app/server

RUN npm install

USER nodebot

# Exponer puerto del servidor web
EXPOSE 3000

WORKDIR /app

# Comando para iniciar el bot y el servidor
CMD ["npm", "run start"]
