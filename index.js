const express=require('express')
const app=express()
const user=require('./models/user')

app.get('/secret',(req,res)=>{
    res.send('this is a secret, if you are watching this means you are authenticated.')
})

app.listen(3000,()=>{
    console.log('app is hosted on port 3000')
})