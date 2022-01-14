const app = require("express")();
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
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

const geoRouter = require('./routes/geo.route');
const storyRouter = require('./routes/story.route');
const algoRouter = require('./routes/algo.route');
const fs = require("fs");
const sharp = require('sharp');

app.listen(4000,(err)=>{
    console.log(!err ? "4000" : "error");
});

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/geo', geoRouter);
app.use('/story', storyRouter);
app.use('/algo', algoRouter);
app.get("/", async(req,res)=>{
  let file = fs.readFileSync("./image.jpeg");
  console.log(file);
  let data = await sharp(file).jpeg({ quality:10 }).toBuffer();
  fs.writeFile("newimage10.jpeg",data,(err)=>{
    return !err ? console.log("Success") : console.log("err",err);
  });
  res.json({"file":"file","newDate":"Success"});
})




