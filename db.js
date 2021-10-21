// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://kumol:kumol254@cluster0.5hz61.mongodb.net/YoFoodie?retryWrites=true&w=majority",{},(err)=>{
    
//     err ? console.log("errr") : console.log("Connected");
// })

const mongoose = require('mongoose');

// Connecting to MongoDb
mongoose.connect(
  'mongodb+srv://kumol:kumol254@cluster0.5hz61.mongodb.net/YoFoodie?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDb'); 
});
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Error in MongoDb Connection' + err); 
  }
});