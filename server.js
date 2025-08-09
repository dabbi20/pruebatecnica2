require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://david:2I6DKIwFndIqOrxL@cluster0.ae4ssad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Routes
const empleadoRoutes = require('./routes/empleado');
const departamentoRoutes = require('./routes/departamento');

// Middleware functions
const { getEmpleado } = empleadoRoutes;
const { getDepartamento } = departamentoRoutes;

// Routes
app.use('/api/empleado', empleadoRoutes);
app.use('/api/departamento', departamentoRoutes);

const startServer = async () => {
    const PORT = process.env.PORT || 4000;
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

            // Handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`${bind} is already in use`);
                    console.log('Attempting to use port 3001...');
                    app.listen(3001, () => {
                        console.log('Server running on port 3001');
                    });
                    break;
                default:
                    throw error;
            }
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();
