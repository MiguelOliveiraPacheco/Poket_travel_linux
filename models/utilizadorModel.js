const mongoose = require('mongoose')

const utente = mongoose.Schema({
    'nome' : {'type': 'String'},
    'nif' : {'type': 'Number'},
    'numeroT' : {'type': 'Number'},
    'origem' : {'type': 'String'},
    'destino' : {'type': 'String'},
    'foto' : {'type':'String'},
    date: {'type': Date, default: Date.now}
})

module.exports = mongoose.model('utilizadorModel',utente)