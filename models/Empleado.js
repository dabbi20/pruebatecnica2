const mongoose = require('mongoose');

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

// Custom validation to check if department exists
EmpleadoSchema.statics.validateDepartment = async function(codigo_departamento) {
    const departamento = await Departamento.findOne({ codigo: codigo_departamento });
    if (!departamento) {
        throw new Error('Departamento no encontrado');
    }
    return true;
};

module.exports = mongoose.model('Empleado', EmpleadoSchema);
