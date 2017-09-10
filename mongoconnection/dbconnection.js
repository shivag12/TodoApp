const mongoose = require("mongoose");
//setting up the promise 
mongoose.Promise = global.Promise;
//seting up the connection URL 
mongoose.connect(process.env.MONGODB_URI).then(()=>{
   // console.log("Connected to Mongodb");
},(err)=>{
    console.log(`Connection Error : ${err}`);
});

