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
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
JWT_SECRET="JWT_SUPER_SECRET"
PORT=4000
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
- **Frontend**: (si está configurado) en `http://localhost:3000`

### 2. Acceder a la documentación de la API

La documentación de la API está disponible en Swagger en la siguiente URL:

```
http://localhost:4000/docs
```

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
