const multer = require("multer");
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

const uploader = (req,res,next) => {
    uploads.single("avatar");
}
module.exports = {uploader};