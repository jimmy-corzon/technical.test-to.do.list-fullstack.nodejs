# Descripción del Reto Técnico

## Título: To Do List Fullstack con Nest.js y Next.js

## Descripción:

El reto consiste en desarrollar una aplicación fullstack de lista de tareas utilizando
**Nest.js** para el backend y **Next.js** para el frontend. La aplicación debe permitir al
usuario de prueba iniciar sesión y realizar operaciones de CRUD sobre sus tareas.
Además, debe incluir comunicación en tiempo real mediante **WebSockets** para
reflejar los cambios en la interfaz sin recarga.

Ambas capas deben respetar principios de arquitectura limpia y buenas prácticas
como los principios **SOLID**, uso de DTOs, módulos, contextos, y patrones de diseño
adecuados.

Se desea que el proyecto esté **dockerizado completamente**, de modo que pueda
levantarse con un solo comando docker-compose up, exponiendo el frontend en
http://localhost:3000 y el backend en http://localhost:4000.

## Tecnologías clave:

- Nest.js (Backend)
- Next.js (Frontend)
- WebSockets (socket.io)
- JWT
- Docker
- Variables de entorno
- Context API (frontend)

## Información adicional:

El usuario para pruebas o para operar debe contar con la siguiente información:

- Nombre de prueba: Blindariesgos
- Correo de prueba: reto@blindariesgos.com
- Contraseña de prueba: Reto123

  Ahora, puede continuar a la siguiente página para iniciar con el reto. Mucho éxito!

## CRITERIOS GENERALES

- Código limpio, modular, siguiendo buenas prácticas de desarrollo.
- Documentación básica de endpoints (README y Swagger).
- Uso deseable de **Docker** para levantar la aplicación completa con un solo
  comando (docker-compose up) sin utilizar Ngnix o un proxy reverso.
- Uso de variables de entorno en ambas partes (Nest y Next).
- Instrucciones claras en el README para correr el proyecto.
- Repositorio estructurado, con separación clara entre frontend y backend si
  aplica.

## 🧠 BACKEND - NEST.JS

### ✅ Criterios funcionales y técnicos:

- Implementar un CRUD completo para tareas.
- Autenticación con JWT (inicio de sesión).
- Validación de datos usando Pipes.
- Uso de **Guards** para rutas protegidas.
- Emitir eventos mediante **WebSockets (socket.io)** para notificar cambios en
  tiempo real (creación, actualización, eliminación de tareas).
- Aplicar principios **SOLID** y arquitectura basada en módulos.
- Uso de **DTOs** validación y tipado fuerte.
- Variables de entorno mediante @nestjs/config.
- Logger implementado para eventos importantes como operaciones del CRUD
  y arranque de servicios.

## 🎨 FRONTEND - NEXT.JS

### ✅ Criterios funcionales y técnicos:

- CRUD completo visual de tareas.
- Autenticación (inicio de sesión) con persistencia de session y protección de
  rutas.
- Integración de **WebSockets (socket.io)** para recibir notificaciones.
- Uso de **Context API** o solución similar para manejar el estado de sesión y
  sockets.
- Validación de formularios.
- Diseño básico, limpio y presentable (no se exige algo complejo, pero debe
  ser visualmente agradable).
