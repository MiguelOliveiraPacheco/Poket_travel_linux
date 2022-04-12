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

router.put('/', (req, res) => {
    upload(req, res, (err) => {
        console.log(req.body)
        console.log(req.file)
        utilizadorModel.findOneAndUpdate({ 'nif': { $eq: req.body.nif } })
            .exec()
            .then((utilizador, error) => {
                if (error) throw error
                if (utilizador == 0) {
                    newUtilizador = new utilizadorModel({
                        nome: req.body.nome,
                        nif: req.body.nif,
                        numeroT: req.body.numeroT,
                        origem: req.body.origem,
                        destino: req.body.destino,
                        foto: filename
                    })
                    newUtilizador.save()
                        .then((result,error) => {
                            if (error) throw error
                            console.log(result)
                            res.json({
                                type: 'success',
                                msg: 'Utilizador criado com sucesso!'
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            res.json({
                                type: 'error',
                                msg: '1-Não foi possível satizfazer o seu pedido. Tente mais tarde'
                            })
                        })
                }
                else {
                    res.json({ msg: 'Utilizador já existente' })
                    console.log(result)
                }
            })
            .catch(error => {
                console.log(error)
                res.json({
                    type: 'error',
                    msg: '2-Não foi possível satizfazer o seu pedido. Tente mais tarde'
                })
            })
    })
})

module.exports = router