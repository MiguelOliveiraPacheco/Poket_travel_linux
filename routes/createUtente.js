const express = require('express')
const router = express.Router()

const utenteModel = require('../models/utenteModel')

router.post('/', (req, res) => {
    console.log(req.body)
    utenteModel.find({'nif':{$eq: req.body.nif}})
    .exec()
    .then((result)=>{
        if(result == 0){
            newUtente = new utenteModel({
               nome: req.body.nome,
               nif: req.body.nif,
               telemovel: req.body.telemovel,
               percursoOrigem: req.body.percursoOrigem,
               percursoDestino: req.body.percursoDestino,
               fotoUrl: req.body.fotoUrl,
               QRurl: req.body.QRurl
            })
            newUtente.save()
            .then(result => {
                console.log('Utente criado')
                res.json({msg: 'Utente criado'})
            })
            .catch(error => {
                console.log(error)
                res.json({msg: 'Infelizmente ocorreu um erro'})
            })
        }
        else {
            res.json({msg:'Utente já existente'})
            console.log(result)
        }
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = router