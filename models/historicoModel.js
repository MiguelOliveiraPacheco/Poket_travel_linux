const mongoose = require('mongoose')

const historico = mongoose.Schema({
    'idUtente' : {'type': 'String'},
    'historico' : [
        {'nif': {'type' : 'Number'}},
        {'telemovel': {'type' : 'Number'}},
        {date: {'type': Date, default: Date.now}}
    ]
})

module.exports = mongoose.model('utenteModel',historico)