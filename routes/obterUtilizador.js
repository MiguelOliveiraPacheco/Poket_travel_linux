const express = require('express')
const router = express.Router()
const path = require('path')
const utilizadorModel = require('../models/utilizadorModel')

router.get('/', (req,res)=>{
    utilizadorModel.find()
    .exec()
    .then((utilizadores,error) =>{
        if (error) throw error
        console.log(utilizadores)
        res.json({
            type: 'success',
            msg: utilizadores
        })
    })
    .catch(error => {
        console.log(error)
        res.json({
            type: 'error',
            msg: '1-Não foi possível satizfazer o seu pedido. Tente mais tarde'
        })
    })

})

module.exports = router

