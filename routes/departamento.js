const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');
const Empleado = require('../models/Empleado');

// GET all departamentos
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET departamento by codigo
router.get('/:codigo', getDepartamento, (req, res) => {
    res.json(res.departamento);
});

// GET empleados by departamento
router.get('/:codigo/empleados', getDepartamento, async (req, res) => {
    try {
        const empleados = await Empleado.find({ codigo_departamento: req.params.codigo }).populate('codigo_departamento', 'nombre');
        res.json(empleados);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ 
            message: 'Error al obtener empleados',
            error: error.message 
        });
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
router.put('/:codigo', getDepartamento, async (req, res) => {
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
        console.error('Error al actualizar departamento:', error);
        res.status(400).json({ 
            message: 'Error al actualizar departamento',
            error: error.message 
        });
    }
});

// DELETE departamento
router.delete('/:codigo', getDepartamento, async (req, res) => {
    try {
        // Primero eliminamos el departamento
        await Departamento.deleteOne({ codigo: req.params.codigo });
        
        // Luego eliminamos todos los empleados asociados a este departamento
        await Empleado.deleteMany({ codigo_departamento: req.params.codigo });

        res.json({ 
            message: 'Departamento eliminado exitosamente',
            codigo: req.params.codigo 
        });
    } catch (error) {
        console.error('Error al eliminar departamento:', error);
        res.status(500).json({ 
            message: 'Error al eliminar departamento',
            error: error.message 
        });
    }
});

// Middleware para obtener departamento
async function getDepartamento(req, res, next) {
    try {
        // Obtener el código de la URL y convertirlo a número
        const codigoParam = req.params.codigo;
        console.log('Código recibido:', codigoParam);
        console.log('Tipo del código:', typeof codigoParam);

        let codigo;
        if (typeof codigoParam === 'string') {
            // Si es string, intentar convertir
            codigo = parseInt(codigoParam);
            console.log('Después de parseInt:', codigo);
            if (isNaN(codigo)) {
                console.log('Error: NaN detectado');
                return res.status(400).json({
                    message: 'Código inválido. Debe ser un número válido',
                    codigo_buscado: codigoParam
                });
            }
        } else if (typeof codigoParam === 'number') {
            // Si ya es número, usar directamente
            codigo = codigoParam;
            console.log('Código ya es número:', codigo);
        } else {
            console.log('Error: Tipo no soportado');
            return res.status(400).json({
                message: 'Formato de código inválido',
                codigo_buscado: codigoParam
            });
        }

        // Buscar el departamento
        console.log('Buscando departamento con código:', codigo);
        console.log('Consulta MongoDB:', { codigo });
        
        const departamento = await Departamento.findOne({ codigo });
        console.log('Departamento encontrado:', departamento);
        
        if (!departamento) {
            console.log('Error: Departamento no encontrado');
            return res.status(404).json({ 
                message: 'Departamento no encontrado',
                codigo_buscado: codigo
            });
        }
        
        res.departamento = departamento;
        next();
    } catch (error) {
        console.error('Error al obtener departamento:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
}

module.exports = {
    router,
    getDepartamento
};
