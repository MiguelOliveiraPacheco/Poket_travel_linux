const mongoose = require('mongoose')

const utente = mongoose.Schema({
    'nome' : {'type': 'String'},
    'nif' : {'type': 'Number'},
    'telemovel' : {'type': 'Number'},
    'percursoOrigem' : {'type': 'String'},
    'percursoDestino' : {'type': 'String'},
    'fotoUrl' : {'type': 'String'},
    'QRurl' : {'type': 'String'},

    date: {'type': Date, default: Date.now}
})

module.exports = mongoose.model('utenteModel',utente)