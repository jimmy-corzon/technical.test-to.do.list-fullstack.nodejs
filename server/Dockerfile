# Usar la imagen base de Node.js
FROM node:20.11.1-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copiar el resto del código de la aplicación
COPY . .

# Generar el código del cliente Prisma
RUN npx prisma generate

# Mostrar el puerto en el que se ejecuta la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD [  "npm", "run", "start:migrate:prod" ]