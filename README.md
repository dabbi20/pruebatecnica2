# Prueba Técnica Desarrollador MEAN - Backend
## Descripción

Este proyecto es un backend robusto y escalable que implementa una API RESTful para la gestión de empleados y departamentos. La aplicación está construida siguiendo las mejores prácticas de desarrollo y utiliza tecnologías modernas del ecosistema Node.js.

## Tecnologías Utilizadas

- **Backend**: Node.js 20.19.0
- **Framework**: Express.js
- **Base de Datos**: MongoDB
- **Middleware**: CORS, dotenv
- **Depuración**: nodemon
- **Gestión de Paquetes**: npm

## Características Principales

- CRUD completo para Departamentos y Empleados
- Validación de datos robusta
- Manejo de errores detallado
- Middleware personalizado para optimizar el flujo de datos
- Consultas eficientes a MongoDB
- Soporte para cascada de eliminación
- Logs detallados para debugging

pruebatecnica2-back/
├── models/              # Modelos de datos
│   ├── Empleado.js     # Modelo para empleados
│   └── Departamento.js # Modelo para departamentos
├── routes/             # Rutas de la API
│   ├── empleado.js     # Rutas para empleados
│   └── departamento.js # Rutas para departamentos
├── server.js           # Configuración del servidor
└── package.json        # Dependencias del proyecto

## Endpoints Disponibles

### Departamentos

- `GET /api/departamento` - Obtener todos los departamentos
- `GET /api/departamento/:codigo` - Obtener un departamento específico
- `GET /api/departamento/:codigo/empleados` - Obtener empleados de un departamento
- `POST /api/departamento` - Crear nuevo departamento
- `PUT /api/departamento/:codigo` - Actualizar departamento
- `DELETE /api/departamento/:codigo` - Eliminar departamento

### Empleados

- `GET /api/empleado` - Obtener todos los empleados
- `GET /api/empleado/:id` - Obtener un empleado específico
- `POST /api/empleado` - Crear nuevo empleado
- `PUT /api/empleado/:id` - Actualizar empleado
- `DELETE /api/empleado/:id` - Eliminar empleado

## 🛠️ Uso de Postman

1. Importar la colección de Postman
2. Configurar las peticiones con los siguientes headers:
   ```json
 
3. Los cuerpos de las peticiones POST/PUT deben ser JSON

## Notas Importantes

- Los departamentos se identifican por un código numérico único
- Los empleados tienen un código único y requieren dos apellidos
- La eliminación de un departamento elimina automáticamente sus empleados asociados
- Se incluyen logs detallados para debugging y monitoreo


## Endpoints API

### Empleados
- `GET /api/empleado` - Obtener todos los empleados
- `GET /api/empleado/:id` - Obtener empleado por ID
- `POST /api/empleado` - Crear nuevo empleado
- `PUT /api/empleado/:id` - Actualizar empleado
- `DELETE /api/empleado/:id` - Eliminar empleado

### Departamentos
- `GET /api/departamento` - Obtener todos los departamentos
- `GET /api/departamento/:id` - Obtener departamento por ID
- `GET /api/departamento/:id/empleados` - Obtener empleados de un departamento
- `POST /api/departamento` - Crear nuevo departamento
- `PUT /api/departamento/:id` - Actualizar departamento
- `DELETE /api/departamento/:id` - Eliminar departamento

## Modelos de Datos

### Empleado
```javascript
{
    codigo: Number,          // Código único del empleado
    nombre: String,          // Nombre del empleado
    apellido1: String,      // Primer apellido
    apellido2: String,      // Segundo apellido
    codigo_departamento: Number  // Código del departamento al que pertenece
}
```

### Departamento
```javascript
{
    codigo: Number,          // Código único del departamento
    nombre: String,          // Nombre del departamento
    descripcion: String      // Descripción opcional
}
```
