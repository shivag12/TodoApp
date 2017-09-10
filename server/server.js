const express = require("express");
const bodyparser = require("body-parser");
const {ObjectID} = require("mongodb");

require("./../config/config");
require("./../mongoconnection/dbconnection.js");
const {user} = require("./../model/usermodel/user");
const mongoose = require("mongoose");


var app = express();
app.use(bodyparser.json());

//Searching the document by id
app.get("/user/:id",(req,res)=>{     
    if(!ObjectID.isValid(req.params.id)){
        return res.status(401).send();
    }    
  user.findById(req.params.id).then((result)=>{    
    if(!result){
        return res.status(401).send({err :"No records found"});
    }
    res.status(200).send(result);
  }).catch((e)=>{
      res.status(400).send();
  })
})

app.get("/finduser",(req,res)=>{
    user.find({name : req.query.name},"name email").then((docs)=>{        
        if(docs.length === 0) {
            return res.status(404).send({err : "No docs found"});
        }
        res.statusCode = 200;
        res.send(docs);
    }).catch((err)=>{
        res.statusCode = 404;
        res.send({});
    })
})

//Inserting document
app.post("/user",(req,res)=>{    
    var signupuser = new user({ 
        name : req.body.name,
        email : req.body.email
    });
    signupuser.save().then(()=>{
        res.status = 200;
        res.send("User is saved successfully");
    },(err)=>{
        res.status(401);
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Application started at port 3000`);
})

module.exports = {app};