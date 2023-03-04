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
    res.render('register')//registering the user with password
})
app.post('/register',async(req,res)=>{
    const {username,password}=req.body
    const hash=await bcrypt.hash(password,12)
    const newuser=new user({
        username:username,
        password:hash
    })
    await newuser.save()
    res.redirect('/')

})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async(req,res)=>{//here we are not identifying id by req.params becouse no need 
    const {username,password}=req.body
    const loggeduser=await user.findOne({username})
    if(loggeduser){
        const result=await bcrypt.compare(password,loggeduser.password)
        if(result){
            res.send('password matched')
        }else{
            res.send('try again')
        }
    }
    else{
        res.send('user not found')
    }
    
})

app.get('/secret',(req,res)=>{
    res.send('this is a secret, if you are watching this means you are authenticated.')
})

app.listen(3000,()=>{
    console.log('app is hosted on port 3000')
})