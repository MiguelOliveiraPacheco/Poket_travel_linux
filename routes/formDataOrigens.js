const express = require('express')
const router = express.Router()
const origemModel = require('../models/origemModel')

router.get('/', (req,res)=>{
    origemModel.find()
    .exec()
    .then(result => {
        res.json(result)
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = router