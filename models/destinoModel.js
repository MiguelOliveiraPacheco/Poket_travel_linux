const mongoose = require('mongoose')

const destino = mongoose.Schema({
    'destino':[      
            {'type':'String'}
        ]
})

module.exports = mongoose.model('destinoModel',destino)