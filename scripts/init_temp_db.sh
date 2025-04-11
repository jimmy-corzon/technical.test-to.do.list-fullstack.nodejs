#!/bin/bash

### Ejecute el siguiente comando para dar permisos de ejecución al script:
#### chmod +x scripts/init_temp_db.sh

# Script para inicializar la base de datos temporal con Docker

echo "Iniciando base de datos temporal con Docker..."

docker run --name todo-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres:15-alpine

if [ $? -eq 0 ]; then
  echo "Base de datos temporal iniciada correctamente."
else
  echo "Error al iniciar la base de datos temporal."
  exit 1
fi