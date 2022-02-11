const express = require("express");
const app = require("express")();
const cors = require('cors');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
var jwt = require('jsonwebtoken');
Sentry.init({ dsn: "https://9ef354132a0444b18606c4cd580a62a3@o990419.ingest.sentry.io/5952302", integrations: [
  new Sentry.Integrations.Http({ tracing: true }),
  new Tracing.Integrations.Express({
    app,
  })
],
tracesSampleRate: 1.0,});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
require("./db");
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use("/uploads", express.static("uploads"));
app.use("/upload", express.static("upload"));
const geoRouter = require('./routes/geo.route');
const storyRouter = require('./routes/story.route');
const algoRouter = require('./routes/algo.route');
const fs = require("fs");
const sharp = require('sharp');

app.listen(8000,(err)=>{
    console.log(!err ? "8000" : "error");
});

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
app.post('/upload', upload.single('avatar'), function (req, res, next) {
  res.json({
    "success": true,
    "for": req.body.name
  })
})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("uploading")
      cb(null, "upload/");
  },
  filename: (req, file, cb) =>{
    console.log(file);
    let name = file.originalname.split(".");
    const ext = name[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+ext)
  }
})
const uploads = multer({ storage: storage });
app.post("/profile", uploads.single("avator"),(req,res,next)=>{
  res.json({
    "success": true,
    for: req.body.name
  })
})
app.use('/geo', cors(), geoRouter);
app.use('/story', cors(), storyRouter);
app.use('/algo', cors() , algoRouter);
app.get("/", cors(), async(req,res)=>{
  let file = fs.readFileSync("./image.jpeg");
  console.log(file);
  let data = await sharp(file).jpeg({ quality:10 }).toBuffer();
  fs.writeFile("newimage10.jpeg",data,(err)=>{
    return !err ? console.log("Success") : console.log("err",err);
  });
  res.json({"file":"file","newDate":"Success"});
})
app.post("/auth", async(req,res)=>{
  try{
    let token = req.body.token;
    var decoded = jwt.verify(token, 'secret');
    //{ algorithm: 'RS256'}
    console.log(decoded)
    return res.json({
      "decoded": decoded
    })
  }catch(error){
    console.log(error);
    res.json({
      error
    })
  }
})