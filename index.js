const express = require ('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 3000

require('dotenv').config({ path: './public/private/.env' })

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/view/index.html')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))


app.use('/create_utente', require('./routes/createUtente'))

mongoose.connect(process.env.MONGOURI, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to MongoDB"));


app.listen(3000,(error)=>{
    if(error) throw error
    console.log('Api listening on port 3000')
})
