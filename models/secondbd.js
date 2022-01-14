
const mongoose = require('mongoose');
const conn2 = mongoose.createConnection("mongodb+srv://kumol:kumol254@cluster0.tsazd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},(error)=>{
  if(error){
    console.log(error);
  }else{
    console.log("connected 2")
  }
});
conn2.model('TingTong2', mongoose.Schema({
  "name":String,
  "title": String,
  "age": Number
}));

module.exports = conn2;