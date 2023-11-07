const mongoose=require('mongoose');
const {isEmail}=require('validator')  //isEmail mawjouda deja f west validator

const userSchema=new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    dateOfBirth:Date,
    address:String,
    phoneNumber:String,
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter an password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
    confirmPassword:String,
    confirmed:{
        type:Boolean,
        defaultValue:false,
    },
    token:{
        type:String,
        default:''
    }
})

const User = mongoose.model('User', userSchema);
module.exports=User;