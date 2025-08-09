const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');

// GET all departamentos
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET departamento by id
router.get('/:id', getDepartamento, (req, res) => {
    res.json(res.departamento);
});

// GET empleados by departamento
router.get('/:id/empleados', getDepartamento, async (req, res) => {
    try {
        const empleados = await Empleado.find({ codigo_departamento: req.params.id }).populate('codigo_departamento', 'nombre');
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new departamento
router.post('/', async (req, res) => {
    const departamento = new Departamento({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    try {
        const newDepartamento = await departamento.save();
        res.status(201).json(newDepartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update departamento
router.put('/:id', getDepartamento, async (req, res) => {
    if (req.body.codigo != null) {
        res.departamento.codigo = req.body.codigo;
    }
    if (req.body.nombre != null) {
        res.departamento.nombre = req.body.nombre;
    }
    if (req.body.descripcion != null) {
        res.departamento.descripcion = req.body.descripcion;
    }

    try {
        const updatedDepartamento = await res.departamento.save();
        res.json(updatedDepartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE departamento
router.delete('/:id', getDepartamento, async (req, res) => {
    try {
        await res.departamento.remove();
        res.json({ message: 'Departamento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware para obtener departamento
async function getDepartamento(req, res, next) {
    try {
        const departamento = await Departamento.findById(req.params.id);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.departamento = departamento;
        next();
    } catch (error) {
        console.error('Error al obtener departamento:', error);
        return res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
}

module.exports = router;
module.exports.getDepartamento = getDepartamento;
