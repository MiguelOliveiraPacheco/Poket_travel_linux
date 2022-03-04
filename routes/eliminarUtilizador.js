const express = require('express')
const router = express.Router()
const path = require('path')
const utilizadorModel = require('../models/utilizadorModel')

router.delete('/:_id', (req,res)=>{
    utilizadorModel.deleteOne({'_id': {$eq: req.params._id}})
    .exec()
    .then((utilizador,error) =>{
        if (error) throw error
        console.log(utilizador)
        if(utilizador!=0) {
            res.json({
                type: 'success',
                msg: 'Utilizador eliminado'
            })
        }
        else {
            res.json({
                type: 'success',
                msg: 'Utilizador não encontrado'
            })
        }

    })
    .catch(error => {
        console.log(error)
        res.json({
            type: 'error',
            msg: 'Não foi possível satizfazer o seu pedido. Tente mais tarde'
        })
    })

})

module.exports = router