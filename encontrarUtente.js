const express = require('express')
const router = express.Router()

const utenteModel = require('../models/utenteModel')

router.post('/', (req, res) => {
    utenteModel.findOne(
        {'nif':{$eq: req.body.nif}})
    .exec()
    .then((result) => {
        if(result==null){
            res.json({
                msg: 'Utente não encontrado',
            })
        }
        else {
            exemploModel.findOneAndUpdate(
                {'nif':{$eq: req.body.nif}},
                {$set: {'': req.body.temp, 'hum': req.body.hum}}, 
                {new:true}
            )
            .then((obj)=>{
                res.json({
                    msg: 'Objeto alterado',
                    data: obj
                })
            })
        }
    })
})

module.exports = router