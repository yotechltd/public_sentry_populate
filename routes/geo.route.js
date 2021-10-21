const route = require('express').Router();
const Geo = require('../models/geo');
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

//http://api.weatherstack.com/forecast?access_key=3360e9cdb3d1f86aa4c37fc51672ff91&query=New York
//const key = 'AIzaSyB3fzeCZKjCEOl74s33u5yUcFx5lRutehM'; AIzaSyB9WnvVn8B6d03-OTdM9l1yyoXVE9Ikqbs
module.exports = route;