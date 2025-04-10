# filepath: /home/jiuser/WorkSpace/Jimmy Corzon/technical.test-to.do.list-fullstack.nodejs/server/Dockerfile
# Imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./
COPY tsconfig*.json ./ 
COPY prisma ./prisma

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY ./src ./src

# Generar el cliente de Prisma
RUN npx prisma generate

# Compilar el proyecto
RUN npm run build

# Exponer el puerto
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]