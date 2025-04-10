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

### 1. Crear una base de datos temporal con Docker

Si no tienes una base de datos PostgreSQL configurada, puedes crear una base de datos temporal con el siguiente comando:

```bash
docker run --name todo-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
```

### 2. Ejecutar el backend manualmente

Por el momento, Docker no está funcionando correctamente para este proyecto. Por lo tanto, debes ejecutar el backend de forma manual. Sigue estos pasos:

1. Ve a la carpeta `server`.
2. Instala las dependencias con `npm install`.
3. Ejecuta el servidor con `npm run start:dev`.

El backend estará disponible en `http://localhost:4000`.

### 3. Acceder a la documentación de la API

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
