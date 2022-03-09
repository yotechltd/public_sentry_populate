const route = require('express').Router();
const Geo = require('../models/geo');
const sharp = require('sharp');
route.post("/", async(req,res)=>{
  try{
    let value = {
      point: { type: "Point", coordinates: [ 40, 5 ] },
      multipoint :{
        type: "MultiPoint",
        coordinates: [
           [ -73.9580, 40.8003 ],
           [ -73.9498, 40.7968 ],
           [ -73.9737, 40.7648 ],
           [ -73.9814, 40.7681 ]
        ]
      }
  	}
    let geo = new Geo(value);
    let c = await geo.save();
    console.log(c);
    res.json({"success":c})
  }catch(err){
    console.log(err);
    res.json({"error": err})
  }
});

route.get("/", async(req,res)=>{
  try{
    geo = await Geo.find();
    res.json({"geo":geo});
  }catch(err){
    res.json({"error":err});
  }
})

route.get('/file', async(req,res,next)=>{
  try{
    const fs = require("fs");
    const file = fs.readFileSync(__dirname+"/../image.jpeg");
    const details = fs.statSync(__dirname+"/../image.jpeg");
    //console.log(details);
    console.log("file size is : ", (details.size/1024).toFixed(2) + "KB");
  //   fs.stat(__dirname+"/../image.jpeg", (err, stats) => {
  //     if (err) {
  //         console.log(`File doesn't exist.`);
  //     } else {
  //         stats.size / 1024;
  //     }
  // });
    console.log(file);
    sharp(file)
      .jpeg({ quality: 50, progressive: true, force: false })
      .png({ progressive: true, force: false })
      .toBuffer()
      .then( data => { 
        console.log(data);
        fs.writeFileSync(__dirname+"/../images.jpeg", data) })
      .catch( err => { console.log(err) });
    res.json({"p": "hello"})
  }catch(err){
    console.log(err);
    res.json({"error": err})
  }
})

//http://api.weatherstack.com/forecast?access_key=3360e9cdb3d1f86aa4c37fc51672ff91&query=New York
//const key = 'AIzaSyB3fzeCZKjCEOl74s33u5yUcFx5lRutehM'; AIzaSyB9WnvVn8B6d03-OTdM9l1yyoXVE9Ikqbs
module.exports = route;