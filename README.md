# To-Do List Fullstack con Nest.js y Next.js

Este proyecto es una aplicación fullstack de lista de tareas que utiliza **Nest.js** para el backend y **Next.js** para el frontend. Permite a los usuarios autenticarse, realizar operaciones CRUD sobre sus tareas y recibir actualizaciones en tiempo real mediante **WebSockets**.

## Tecnologías clave

- **Backend**: Nest.js
- **Frontend**: Next.js
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT
- **WebSockets**: Socket.io
- **Docker**: Contenedores para backend, frontend y base de datos

---

## Requisitos previos

- **Docker** y **Docker Compose** instalados en tu máquina.
- Configurar las variables de entorno en el archivo `.env` del backend.

---

## Configuración del proyecto

### Variables de entorno

Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:

```env
# Base de Datos
DATABASE_URL="postgresql://user:password@database:5432/mydatabase?schema=public"

# JWT
JWT_SECRET=tu_secreto_aqui
```

---

## Instrucciones para ejecutar el proyecto

### 1. Construir y ejecutar los contenedores con Docker

```bash
docker-compose up --build
```

Esto levantará los siguientes servicios:

- **Base de datos**: PostgreSQL en `localhost:5432`
- **Backend**: Nest.js en `http://localhost:4000`
- **Frontend**: Next.js en `http://localhost:3000`

### 2. Acceder a la documentación de la API

La documentación de la API está disponible en Swagger en la siguiente URL:

```
http://localhost:4000/docs
```

---

## Instrucciones para desarrollo local

### 1. Configurar la base de datos local

Asegúrate de tener PostgreSQL instalado y en ejecución en tu máquina local. Crea una base de datos para el proyecto y actualiza las variables de entorno en el archivo `.env` dentro de la carpeta `server` con los detalles de tu base de datos local:

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos?schema=public"

# JWT
JWT_SECRET=tu_secreto_aqui
```

### 2. Instalar dependencias

Ejecuta el siguiente comando en la carpeta `server` para instalar las dependencias necesarias:

```bash
npm install
```

### 3. Ejecutar migraciones y seed

Aplica las migraciones de la base de datos y ejecuta el seed para poblar datos iniciales:

```bash
npm run prisma:deploy
npm run prisma:seed
```

### 4. Iniciar el servidor en modo desarrollo

Ejecuta el siguiente comando para iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:4000` y la documentación de la API en `http://localhost:4000/docs`.

---

## Actualización de la documentación

### Desarrollo local con base de datos temporal

#### 1. Inicializar la base de datos temporal

Ejecuta el siguiente script para inicializar una base de datos temporal con Docker:

```bash
chmod +x scripts/init_temp_db.sh
./scripts/init_temp_db.sh
```

Esto creará un contenedor Docker con PostgreSQL configurado con las credenciales especificadas en el script.

#### 2. Configurar el entorno

Asegúrate de que el archivo `.env` en la carpeta `server` esté configurado correctamente para apuntar a la base de datos temporal:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
```

#### 3. Ejecutar el backend en modo desarrollo

Navega a la carpeta `server` y ejecuta los siguientes comandos:

```bash
npm install
npm run prisma:deploy
npm run prisma:seed
npm run start:dev
```

El servidor estará disponible en `http://localhost:4000` y la documentación de la API en `http://localhost:4000/docs`.

---

## Endpoints principales del backend

### Autenticación

- **POST** `/auth/sign-up`: Registro de usuario.
- **POST** `/auth/login`: Inicio de sesión.

### Tareas

- **POST** `/tasks`: Crear una nueva tarea.
- **GET** `/tasks/my-tasks`: Obtener las tareas del usuario autenticado.
- **GET** `/tasks/public`: Obtener tareas públicas.
- **PATCH** `/tasks/:id`: Actualizar una tarea.
- **DELETE** `/tasks/:id`: Eliminar una tarea.
