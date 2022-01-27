const mongoose = require('mongoose')

const exemplo = mongoose.Schema({
    'idArduino' : {'type': 'String'},
    'cliente' : {'type': 'String'},
    'temp' : {'type': 'Number'},
    'hum' : {'type': 'Number'},
    'fotoUrl' : {'type': 'String'},
    'estado': {'type' : 'String'},
    date: {'type': Date, default: Date.now}
})

module.exports = mongoose.model('exemploModel',exemplo)