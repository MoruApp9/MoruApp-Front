# Usa la imagen oficial de Node.js como base
FROM node:alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package.json .

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación para producción
RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 5173

# Define el comando por defecto para iniciar la aplicación
CMD ["npm", "run", "dev"]
