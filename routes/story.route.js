const { uploadImage } = require( "../helper/helper" );
const deliveryController = require("../controller/delivery.controller");
const route = require("express").Router();
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

route.post("/person", async(req,res,next)=>{
    var aaron = new Person({ _id: 5, name: 'Jharun', age: 23 });
    let person = await aaron.save();
    res.json({"success": person})
})

route.post("/story", async(req,res)=>{
    var story1 = new Story({
        title: "Once upon a timex.",
        _creator: 0,
        fans:[1,2,3,4]
      });

      let story = await story1.save();
      res.json({"successs": story});
})

route.get("/person",async(req,res)=>{
    //let person = await Person.find({}).populate({path:"stories", populate: { path: '_creator fans', populate:{ path:"stories", populate: { path: '_creator fans', populate:{ path:"stories", populate: { path: '_creator fans', populate:{ path:"stories"}}}}}}});
    //person.populated('fans');
    let person = await Person.find({_id: 0}).populate({path:"stories"});
    res.json({"body":person})
})

route.get("/story", async(req,res,next)=>{
    try{
      let story = await Story.findOne({}).select({"body": "$title", creator: "$_creator"})
      
      res.json({"body":storys});
      next();
    }catch(error){
      res.status(500).json({"error":error.stack})
    }
})

const multer = require("multer");
const { uploader } = require( "../helper" );
const { translateAliases } = require("../models/geo");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("hello");
      cb(null, "upload/");
  },
  filename: (req, file, cb) =>{
    let name = file.originalname.split(".");
    const ext = name[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+ext)
  }
})
const uploads = multer({ storage: storage });

route.post("/upload", uploads.single('avatar'), function uploadAudio(req, res) {
  res.json({
    success: true,
    body: req.body
  })
});
const bottomBannerController = require("../controller/bottombanner.controller");
route.put("/delivery", deliveryController.updateDelivery);
route.get("/delivery", deliveryController.calculateDeliveryCharge);
route.put("/bottom-banner", bottomBannerController.updateBottomBanner);
route.get("/bottom-banner", bottomBannerController.getBanner);
module.exports = route;