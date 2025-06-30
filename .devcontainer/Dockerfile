# Usa imagen base con soporte para node, compilación de módulos nativos y devcontainers
ARG VARIANT=18
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

# Evita errores de instalación de dependencias nativas como 'sharp'
RUN apt-get update && apt-get install -y \
git \
curl \
wget \
gnupg \
ca-certificates \
fonts-liberation \
libappindicator3-1 \
libasound2 \
libatk-bridge2.0-0 \
libatk1.0-0 \
libc6 \
libcairo2 \
libcups2 \
libdbus-1-3 \
libexpat1 \
libfontconfig1 \
libgbm1 \
libgcc1 \
libgconf-2-4 \
libgdk-pixbuf2.0-0 \
libglib2.0-0 \
libgtk-3-0 \
libnspr4 \
libnss3 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libstdc++6 \
libx11-6 \
libx11-xcb1 \
libxcb1 \
libxcomposite1 \
libxcursor1 \
libxdamage1 \
libxext6 \
libxfixes3 \
libxi6 \
libxrandr2 \
libxrender1 \
libxss1 \
libxtst6 \
lsb-release \
xdg-utils \
--no-install-recommends && \
apt-get clean && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo (por si lo necesitás explícito)
WORKDIR /workspace

# Opcional: instala nodemon globalmente si lo usás fuera de scripts
RUN npm install -g nodemon