# Temel bir Node.js ve Electron ortamı
FROM node:20-bullseye

# Çalışma dizinini oluşturun
WORKDIR /src

# Paket dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN yarn install

# Projeyi kopyalayın
COPY . .

# Electron'u küresel olarak yükleyin
RUN yarn add -g electron@32.0.1 electron-builder@24.13.3

# RPM oluşturmak için gerekli olan araçları yükleyin
RUN apt-get update && apt-get install -y rpm

# Build komutunu çalıştırın
CMD ["yarn", "build:linux"]
