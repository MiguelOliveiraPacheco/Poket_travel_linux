const mongoose = require('mongoose')

const origem = mongoose.Schema({
    'origem':[      
            {'type':'String'}
        ]
})

module.exports = mongoose.model('origemModel',origem)