const express = require("express");
const bodyparser = require("body-parser");
const {ObjectID} = require("mongodb");

require("./../mongoconnection/dbconnection");
const {User} = require("./../model/usermodel/user");

console.log(ObjectID());

var app = express();

app.get("/user",(req,res)=>{

    res.send(req.headers.id);
})

app.listen(3000);