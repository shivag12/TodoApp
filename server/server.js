const express = require("express");
const bodyparser = require("body-parser");
const {ObjectID} = require("mongodb");
const _ = require("lodash");

require("./../config/config");
require("./../mongoconnection/dbconnection.js");
const {user} = require("./../model/usermodel/user");
const {todo} = require("./../model/todomodel/todo");
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

//Finding the user by name 
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


//Adding a note 
app.post("/todo",(req,res)=>{
    var body = _.pick(req.body,["text"]);
    var newtodo = new todo(body)
    newtodo.save().then(()=>{
        res.status(200).send("Note is added successfully");
    }).catch((e)=>{
        res.status(404);
    })
})

//Find a note using the Id
app.get("/todo",(req,res)=>{
    if(!ObjectID.isValid(req.query.id)){
        return res.status(401).send("Not a valid a ID");
    }
    todo.findById(req.query.id).then((doc)=>{
        if(!doc){
          return res.send({});
        } 
        res.status(200).send(doc);
        
    }).catch((e)=>{
        res.status(404);
    })
})

app.delete("/todo",(req,res)=>{
    
})


//Inserting document
app.post("/user",(req,res)=>{  
    
    var body = _.pick(req.body,["name","email","password"]);
    
    var signupuser = new user(body);
    signupuser.save().then(()=>{
        res.status = 200;
        res.send("User is saved successfully");
    }).catch((e)=>{
        res.status(404).send(e);
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Application started at port 3000`);
})

module.exports = {app};