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

# Crear usuario nodebot
RUN useradd -m -u 1001 nodebot

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Crear directorios para auth y cache
RUN mkdir -p /app/auth/bot /app/cache/bot /app/persistance && \
    chown -R nodebot:nodebot /app

# Copiar package.json
COPY --chown=nodebot:nodebot package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY --chown=nodebot:nodebot . .

# Cambiar a usuario no root
USER nodebot

# Healtcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Exponer puerto del servidor web
EXPOSE 3000

# Variables default
ENV NODE_ENV=production
ENV DB_PATH=/app/persistance/
ENV DB_FILENAME=botConfigs.db
ENV AUTH_PATH=/app/auth
ENV CACHE_PATH=/app/cache

# Comando para iniciar el bot y el servidor
CMD ["node", "./bin/main/main.js"]
