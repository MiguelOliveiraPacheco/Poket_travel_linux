const express = require('express')
const router = express.Router()

const destinoModel = require('../models/destinoModel')

router.post('/', (req, res) => {
    console.log(req.body)
    destinoModel.find()
    .exec()
    .then((result)=>{
        if(result == 0){
            console.log('não existe')
            newDestino = new destinoModel({
               destino: req.body.destino
            })
            newDestino.save()
            .then(result => {
                console.log('Destinos criados')
                res.json({msg: 'Destinos criados'})
            })
            .catch(error => {
                console.log(error)
                res.json({msg: 'Ocorreu um erro'})
            })
        }
        else {
            console.log('Destinos já criados')
            res.json({msg: 'Os destinos já estão criados'})
        }
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = router