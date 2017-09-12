const mongoose = require("mongoose");
const validator = require("validator");

var todo =  mongoose.model("todo",{
    text : {
        type : String,
        minlength : 1,
        required : true,
        trim : true
    },
    completedBy : {
        type : String,
        minlength : 1,
        //required : true,
        trim : true
    },
    completedAt : {
        type : Number,
        minlength : 1,
        //required : true,
        trim : true,
        validate : {
            validator : (value)=>{
                return validator.isNumeric(value);
            },
            message : "{VALUE} is not a number"
        }
    }
})

module.exports = {todo};