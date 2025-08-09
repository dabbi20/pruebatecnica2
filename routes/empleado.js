const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');

// GET all empleados
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find()
            .populate('codigo_departamento', 'nombre');
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET empleado by id
router.get('/:id', getEmpleado, (req, res) => {
    res.json(res.empleado);
});

// POST create new empleado
router.post('/', async (req, res) => {
    try {
        // Validate department exists
        await Empleado.validateDepartment(req.body.codigo_departamento);

        const empleado = new Empleado({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            apellido1: req.body.apellido1,
            apellido2: req.body.apellido2,
            codigo_departamento: req.body.codigo_departamento
        });

        const newEmpleado = await empleado.save();
        res.status(201).json(newEmpleado);
    } catch (error) {
        console.error('Error al crear empleado:', error);
        res.status(400).json({ 
            message: 'Error al crear empleado',
            error: error.message 
        });
    }
});

// PUT update empleado
router.put('/:id', getEmpleado, async (req, res) => {
    try {
        if (req.body.codigo != null) {
            res.empleado.codigo = req.body.codigo;
        }
        if (req.body.nombre != null) {
            res.empleado.nombre = req.body.nombre;
        }
        if (req.body.apellido1 != null) {
            res.empleado.apellido1 = req.body.apellido1;
        }
        if (req.body.apellido2 != null) {
            res.empleado.apellido2 = req.body.apellido2;
        }
        if (req.body.codigo_departamento != null) {
            // Validate new department if provided
            await Empleado.validateDepartment(req.body.codigo_departamento);
            res.empleado.codigo_departamento = req.body.codigo_departamento;
        }

        const updatedEmpleado = await res.empleado.save();
        res.json(updatedEmpleado);
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
        res.status(400).json({ 
            message: 'Error al actualizar empleado',
            error: error.message 
        });
    }
});

// DELETE empleado
router.delete('/:id', getEmpleado, async (req, res) => {
    try {
        // Eliminar el empleado usando el ID
        await Empleado.deleteOne({ _id: req.params.id });
        
        res.json({ 
            message: 'Empleado eliminado exitosamente',
            id: req.params.id 
        });
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        res.status(500).json({ 
            message: 'Error al eliminar empleado',
            error: error.message 
        });
    }
});

// Middleware para obtener empleado
async function getEmpleado(req, res, next) {
    try {
        const empleado = await Empleado.findById(req.params.id).populate('codigo_departamento', 'nombre');
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.empleado = empleado;
        next();
    } catch (error) {
        console.error('Error al obtener empleado:', error);
        return res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
}

module.exports = {
    router,
    getEmpleado
};
