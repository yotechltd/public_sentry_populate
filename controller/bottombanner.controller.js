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