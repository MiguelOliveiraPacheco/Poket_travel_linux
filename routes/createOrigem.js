const express = require('express')
const router = express.Router()

const origemModel = require('../models/origemModel')

router.post('/', (req, res) => {
    console.log(req.body)
    origemModel.find()
    .exec()
    .then((result)=>{
        if(result == 0){
            console.log('não existe')
            newOrigem = new origemModel({
               origem: req.body.origem
            })
            newOrigem.save()
            .then(result => {
                console.log('Origens criadas')
                res.json({msg: 'Origens criadas'})
            })
            .catch(error => {
                console.log(error)
                res.json({msg: 'Ocorreu um erro'})
            })
        }
        else {
            console.log('Origens já criados')
            res.json({msg: 'As Origens já estão criadas'})
        }
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = router