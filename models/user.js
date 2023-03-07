const { text } = require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Usename cannot be blank!']
    },
    password:{
        type:String,
        required:[true,'Password cannot be blank!']
    }
})
userSchema.statics.findandvalidate=async function (username,password) {//instead of finding and validating individually we are writing a method, to minimize line of code
    const founduser=await this.findOne({username})//'this' refers to perticular user/model
   const isvalid= await bcrypt.compare(password,founduser.password)
    return isvalid?founduser:false;
}
userSchema.pre('save',async function(next){//this will run everytime before saving the user model, so even if we update the 'username' a modified hash pass will generate

    if(!this.isModified('password')) return next()//return true/false, if the password is not modified then we'll jump on to the next()
    this.password=await bcrypt.hash(this.password,12)
    next();
})
module.exports=mongoose.model('User',userSchema) 