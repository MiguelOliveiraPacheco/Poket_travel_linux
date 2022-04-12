const express = require ('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 3000

require('dotenv').config({ path: './public/private/.env' })

app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/public/view/home.html')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

app.use(express.static('./public'))

//rota para teste do QR
app.post('/teste', (req, res) => {
/* https://www.tabnine.com/code/javascript/modules/qrcode */
})


//ROTAS
app.use('/origem',require('./routes/createOrigem'))
app.use('/formdataorigens',require('./routes/formDataOrigens'))
app.use('/destino',require('./routes/createDestino'))
app.use('/formdatadestinos',require('./routes/formDataDestinos'))
app.use('/createutilizador', require('./routes/createUtilizador'))
app.use('/utilizadores', require('./routes/obterUtilizador'))
app.use('/delete', require('./routes/eliminarUtilizador'))
app.use('/editar', require('./routes/editarUtilizador'))


mongoose.connect(process.env.MONGOURI, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to MongoDB"));


app.listen(3000,(error)=>{
    if(error) throw error
    console.log('Api listening on port 3000')
})
