const mongoose = require('mongoose');

// Connecting to MongoDb
// let db = mongoose.connect(
//   'mongodb+srv://kumol:kumol254@cluster0.5hz61.mongodb.net/YoFoodie?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDb'); 
// });
// mongoose.connection.on('error', (err) => {
//   if (err) {
//     console.log('Error in MongoDb Connection' + err); 
//   }
// });

const { TingTong, conn1} = require("./models/firstdb");
const conn2 = require("./models/secondbd");
const db1 = require("./models/firstdb");
const app = require("express")();
//const TingTong = require("./models/firstdb");
app.listen(5000,(err)=>{
  console.log(!err ? "5000" : "error");
});

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/s", async(req,res)=>{
  try{
    let val = await TingTong.find({});
    console.log(val);
    res.json({
      "result": val
    })
  }catch(error){
    console.log(error);
    res.json({
      "error": error
    })
  }
})
app.get("/", async(req,res)=>{
  try{
    // await conn1.collection("TingTongs").insertOne({"title":"new", "name":"Hafiz"})
    // let value = await conn1.collection("TingTongs").find({}).toArray();
    //let value = await db1.TingTong.create({"title":"new", "name":"Hafiz"});
    let value = await db1.TingTong.find();
    console.log(value);
    res.status(200).json({"va": value})
  }catch(error){
    return res.status(500).json({
      "error": error
    })
  }
});
app.post("/", async(req,res)=>{
  try{
    let value = await conn2.collection("TingTong2s").insertOne({"title":"new", "age":32});
    console.log(value);
    res.json({"va": value});
  }catch(error){
    console.log(error);
    return res.json({
      "error": error.message
    })
  }
})