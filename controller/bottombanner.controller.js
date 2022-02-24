const BottomBanner = require("../models/ban");

class BannerController{
    async updateBottomBanner(req,res){
        try{
            let banner = await BottomBanner.find({}).lean(),
                firstFile = "firstFile",
                secondFile = "secondFile",
                thirdFile = "thirdFile";
            let {firstBanner, secondBanner, thirdBanner} = req.body;
            firstBanner ? firstBanner.banner = firstFile : null;
            secondBanner ? secondBanner.banner = secondFile : null;
            thirdBanner ? thirdBanner.banner = thirdFile : null;
            let newBanner = {
                firstBanner: firstBanner,
                secondBanner: secondBanner,
                thirdBanner: thirdBanner
            },
            modified,
            bottomBanner;
            if(banner && banner.length>0){
                modified = await BottomBanner.updateOne({},{$set: newBanner});
            }else{
                bottomBanner = new BottomBanner({
                    ...newBanner
                })
                bottomBanner = await bottomBanner.save();
            }

            return banner && banner.length > 0 && modified && modified.matchedCount 
                ? modified.modifiedCount ? res.json({
                    statusCode: 200,
                    message : "Updated"
                }) : res.json({
                    statusCode: 304,
                    message: "Not modified"
                })
                : bottomBanner 
                ? res.json({
                    statusCode: 201,
                    message: "created"
                }) : res.json({
                    success: false,
                    message: "Failed to create"
                });
        }catch(error){
            return res.json({
                statusCode: 500,
                message: "Internal Server error",
                error: error.stack
            })
        }
    }
    async getBanner(req,res){
        try{
            let banner = await BottomBanner.findOne({}).select("-__v -_id").lean(),
                bottomBanner = [];
            banner ? Object.entries(banner).forEach(([key,value])=>{
                bottomBanner.push(value);
            }) : [];

            return res.json({
                success: true,
                statusCode: 200,
                bottomBanner
            });
        }catch(error){
            return res.json({
                statusCode: 500,
                message: "Internal Server error",
                error: error.stack
            })
        }
    }
}

module.exports = new BannerController();

{
    const moment = require('moment');
console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
var converter = require('hex2dec');

let date = moment();
// let day = date.format('DD');
let year = date.format('YYYY');
let month = Number(date.format('MM'));
let day = Number(date.format('DD'));
let hour = Number(date.format('HH'));
let min = date.format('mm');
let second = date.format('ss');
let mlSecond = date.milliseconds();
let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let b = 'asdfghjklopXYZESTFmnbvcxOPQzqwertyui';
let fy = year.slice(0, 2);
let ly = year.slice(2, 4);

let value =
  Number(ly) +
  19 +
  fy +
  a[month] +
  b[day] +
  a[hour] +
  converter.decToHex(min) +
  second +
  mlSecond;
console.log(fy);
console.log(value);
console.log(typeof year);

}