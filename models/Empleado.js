const mongoose = require('mongoose');
const Departamento = require('./Departamento');

const EmpleadoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String,
        required: true
    },
    codigo_departamento: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


EmpleadoSchema.statics.validateDepartment = async function(codigo_departamento) {
    try {
        const departamento = await Departamento.findOne({ codigo: codigo_departamento });
        if (!departamento) {
            throw new Error('Departamento no encontrado');
        }
        return true;
    } catch (error) {
        console.error('Error validando departamento:', error);
        throw error;
    }
};

module.exports = mongoose.model('Empleado', EmpleadoSchema);
