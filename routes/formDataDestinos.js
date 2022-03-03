const express = require('express')
const router = express.Router()
const destinoModel = require('../models/destinoModel')

router.get('/', (req,res)=>{
    destinoModel.find()
    .exec()
    .then(result => {
        res.json(result)
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = router