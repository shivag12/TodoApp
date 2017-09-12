const mongoose = require("mongoose");
const validator = require("validator");

//defining the schema 
var userschema = mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        default : "AdminAccount",
        required : true
    },
    email : {
        type : String,
        minlength : 1,
        trim : true,
        default : "gshiva@ibm.com",       
        required : true,
        unique : true,
        validate : {
            validator : (value)=>{
                return validator.isEmail(value);
            } ,
            message : "{VALUE} is not a valid email id"
        }
    }, 
    password : {
        type : String,
        minlength : 6,
        trim : true,
        required : true
    }, 
    token : [
        {
            access : {
                type : String,
                required : true            
            },
            token : {
                type : String,
                required : true              
            }
        }
    ]
})

//creating the model 
var user = mongoose.model("users",userschema);

//exporting the user model
module.exports.user = user;