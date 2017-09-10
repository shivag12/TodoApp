const mongoose = require("mongoose");

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
        required : true
    }
})

//creating the model 
var user = mongoose.model("users",userschema);

//exporting the user model
module.exports.user = user;