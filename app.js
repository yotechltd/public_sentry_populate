const express = require("express");
const app = require("express")();
const cors = require('cors');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { Logtail } = require("@logtail/node");
const logtail = new Logtail("HDatMw64dqfQipvYw99n3dUE");
var jwt = require('jsonwebtoken');
Sentry.init({ dsn: "https://9ef354132a0444b18606c4cd580a62a3@o990419.ingest.sentry.io/5952302", integrations: [
  new Sentry.Integrations.Http({ tracing: true }),
  new Tracing.Integrations.Express({
    app,
  })
],
tracesSampleRate: 1.0,});
// app.use(Sentry.Handlers.errorHandler({
//   shouldHandleError(error) {
//     // Capture all 404 and 500 errors
//     // if (error.status === 404 || error.status === 500) {
//     //   return true;
//     // }
//     console.log(error);
//     return true;
//   },
// }));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
// app.use(function onError(err, req, res, next){
//   console.log(err);
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   console.log(res);
//   res.end("I got error " + res.sentry + " ");
// });


require("./db");
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var bodyParser = require('body-parser');
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
const fileUpload = require("express-fileupload");
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.post('/upload', (req,res,next)=>{
  try{
    file = req.files.file;
    console.log(__dirname);
    const fs = require('fs');

    // directory to check if exists
    const dir =  __dirname + '/temp/1';

    // check if directory exists
    if (fs.existsSync(dir)) {
      console.log(fs.existsSync(dir));
        console.log('Directory exists!');
    } else {
        console.log(fs.existsSync(dir));
        fs.mkdirSync(dir);
        console.log('Directory not found.');
    }
    uploadPath = __dirname + '/temp/1/' + file.name;
    console.log(uploadPath)
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
  }catch(error){
    return res.json({
      message: error.message,
      error: error.stack
    })
  }
})

var fse = require('fs-extra');

app.post("/move",(req,res)=>{
  try{
    fse.move(__dirname+"/temp/1/", __dirname+'/upload/1/', function (err) {
      if (err) return console.error(err)
      fs.rmSync(__dirname+"/temp/1/", { recursive: true, force: true });
      res.json({
        success: true,
        message: "removed"
      })
    })
  }catch(error){
    res.json({error: error.stack})
  }
})


const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
app.post('/allmulterupload', upload.single('avatar'), function (req, res, next) {
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
    logtail.info(`GeneratedToken ${token}`);
    logtail.info("Printed token");
    logtail.log(token);
    //var decoded = jwt.verify(token, 'secret');
    //{ algorithm: 'RS256'}
    console.log(decoded)
    return res.json({
      "decoded": decoded
    })
  }catch(error){
    logtail.error(error);
    res.json({
      error
    })
  }
})