const express=require('express')
const app=express()
const user=require('./models/user')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded({extended:true}))//this is use to parse(in programming parse meaning to analyze or interprete data according to specific syntax or structure) 'req.body'.

mongoose.connect('mongodb://localhost:27017/authdemo', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
})
app.get('/',(req,res)=>{
    res.send('This is the home page')
})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register',async(req,res)=>{
    const {Uname,Pass}=req.body
    const hash=await bcrypt.hash(Pass,12)
    const newuser=new user({
        username:Uname,
        password:hash
    })
    await newuser.save()
    res.redirect('/')

})

app.get('/secret',(req,res)=>{
    res.send('this is a secret, if you are watching this means you are authenticated.')
})

app.listen(3000,()=>{
    console.log('app is hosted on port 3000')
})