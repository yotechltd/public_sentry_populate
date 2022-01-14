const mongoose = require('mongoose');

const conn1 = mongoose.createConnection("mongodb+srv://kumol:kumol254@cluster0.5hz61.mongodb.net/YoFoodie?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},(error)=>{
  if(error){
    console.log(error);
  }else{
    console.log("connected 1")
  }
});
TingTong = conn1.model("TingTong", mongoose.Schema({
  "title": String,
  "name": String
}));
module.exports = {
  TingTong,
  conn1
};



