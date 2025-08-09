# Prueba Técnica Desarrollador MEAN - Backend

## Descripción
Este proyecto es el backend de una aplicación que gestiona empleados y departamentos. Implementa una API RESTful utilizando Node.js, Express y MongoDB.

## Requisitos
- Node.js 14 o superior
- MongoDB
- npm (Node Package Manager)

## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Configurar MongoDB
   - Por defecto se conecta a `mongodb://localhost:27017/pruebatecnica2`
   - Puedes modificar la conexión en el archivo `server.js`

## Estructura del Proyecto
```
pruebatecnica2-back/
├── models/
│   ├── Empleado.js
│   └── Departamento.js
├── routes/
│   ├── empleado.js
│   └── departamento.js
├── server.js
└── package.json
```

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

## Ejecución
Para iniciar el servidor:
```bash
npm start
```

Para iniciar en modo desarrollo (con hot reload):
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## Estado de la API
- CRUD completo para empleados
- CRUD completo para departamentos
- Relación entre empleados y departamentos
- Manejo de errores
- Documentación de endpoints

## Tecnologías Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv
- nodemon (para desarrollo)
