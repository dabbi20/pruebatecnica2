const mongoose = require('mongoose');

const DepartamentoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Departamento', DepartamentoSchema);
