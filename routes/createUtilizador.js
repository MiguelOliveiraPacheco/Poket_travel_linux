const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const utilizadorModel = require('../models/utilizadorModel')

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

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        console.log(req.body)
        console.log(req.file)
        res.json({
            type:'success',
            msg: 'Utilizador inserido com sucesso'
        })
        /*inserir na base de dados*/
        /*if(err){
            res.json({res: err})
        } else {
            if(req.file == undefined){
              res.json({res:'No file selected'})
            }
            else{
                console.log(req.file)
                res.json({res:'Success!'})
            }           
        }*/
    })
})

module.exports = router



/**
 * 
 * console.log(req.body)
    utilizadorModel.find({'nif':{$eq: req.body.nif}})
    .exec()
    .then((result)=>{
        if(result == 0){
            newUtilizador = new utilizadorModel({
               nome: req.body.nome,
               nif: req.body.nif,
               numeroT: req.body.numeroT,
               origem: req.body.origem,
               destino: req.body.destino,
               //foto: filename
            })
            
            newUtilizador.save()
            .then(result => {
                console.log('Utilizador criado')
                res.json({msg: 'Utilizador criado'})
            })
            .catch(error => {
                console.log(error)
                res.json({msg: 'Infelizmente ocorreu um erro'})
            })
        }
        else {
            res.json({msg:'Utilizador já existente'})
            console.log(result)
        }
    })
    .catch(error =>{
        console.log(error)
    })
 */
