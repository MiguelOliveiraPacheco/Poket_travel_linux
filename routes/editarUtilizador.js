const express = require('express')
const router = express.Router()
const path = require('path')
const utilizadorModel = require('../models/utilizadorModel')
const multer = require('multer')

router.get('/:_id', (req,res)=>{
    utilizadorModel.findOne({'_id': {$eq: req.params._id}})
    .exec()
    .then((utilizador,error) =>{
        if (error) throw error
        console.log(utilizador)
        if(utilizador!=0) {
            res.json({
                type: 'success',
                msg: 'Utilizador encontrado',
                utilizador: utilizador
            })
        }
        else {
            res.json({
                type: 'error',
                msg: 'Utilizador não encontrado'
            })
        }

    })
    .catch(error => {
        console.log(error)
        res.json({
            type: 'error',
            msg: 'Utilizador não encontrado'
        })
    })

})

let filename, text

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        text = req.headers.myheader
        filename = text + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
}).single('image')

function checkFileType(file, callback) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return callback(null, true)
    } else {
        callback('Error: images only!')
    }
}

router.put('/atualizar', (req, res) => {
    console.log(req.body)
    utilizadorModel.findOne({ 'nif': { $eq: req.body.nif } })
    .exec()
    .then((result) =>{
        if(result==null){
            res.json({
                msg: 'Utilizador não encontrado',
            })
        }
        else {
            utilizadorModel.findOneAndUpdate(
                {'nif':{$eq: req.body.nif}},
                {$set: {'nome': req.body.nome, 'numeroT': req.body.numeroT, 'origem': req.body.origem, 'destino': req.body.destino}},
                {new:true}
            )
            .then((obj)=>{
                res.json({
                    msg: 'Utilizador alterado',
                    data: obj
                })
            })
            .catch(error => {
                res.json({
                    msg: 'Ocorreu um erro'
                })
            })
        }
        
    })
    .catch(error => {
        res.json({
            msg: 'Ocorreu um erro'
        })
    })

})

module.exports = router