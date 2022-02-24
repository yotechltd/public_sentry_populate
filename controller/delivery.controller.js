const Delivery = require("../models/del");
class DeliveryController {
    async updateDelivery(req,res){
        try{
            let {zoneInsideDhaka,zoneInsideDhakaCharge,zoneOutsideDhaka,zoneOutsideDhakaCharge,origin} = req.body;
            let zone = await Delivery.findOne({origin: origin});
            let body = {},
                modified,
                newDelivery;
            zoneInsideDhaka ? body["zoneInsideDhaka"] = zoneInsideDhaka : null;
            zoneInsideDhakaCharge ? body["zoneInsideDhakaCharge"] = zoneInsideDhakaCharge : null;
            zoneOutsideDhaka ? body["zoneOutsideDhaka"] = zoneOutsideDhaka : null;
            zoneOutsideDhakaCharge ? body["zoneOutsideDhakaCharge"] = zoneOutsideDhakaCharge : null;
            origin ? body["origin"] = origin : null;
            if(zone){
                modified = await Delivery.updateOne({origin: origin},{$set: body});
            }else{
                let del = new Delivery({
                    ...body
                });
                newDelivery = await del.save()
            }
            return zone && modified && modified.matchedCount 
                ? modified.modifiedCount
                ? res.json({
                    success: true,
                    modified
                })
                : res.json({
                    success: false,
                    message: "Not modified"
                })
                : newDelivery
                ? res.json({
                    success: true,
                    statusCode: 201
                })
                : res.json({
                    success: false,
                    message: "Failed to create"
                });
        }catch(error){
            res.json({
                success:false,
                statusCode: 500,
                message: error.message,
                error: error.stack
            });
        }
    }
    async calculateDeliveryCharge(req,res){
        try{
            let {origin, zone} = req.query;
            let delivery = await Delivery.findOne({origin: origin}).lean();
            let index = delivery && delivery.zoneInsideDhaka
                ? delivery.zoneInsideDhaka.findIndex(z=>{
                    return z==zone;
                }) : -1;

            let deliveryCharge = index >= 0
                ? delivery.zoneInsideDhakaCharge : delivery.zoneOutsideDhakaCharge;
            return res.json({
                success: true,
                statusCode: 200,
                message: "Delivery charge calculated",
                deliveryCharge
            });
        }catch(error){
            return res.json({
                success:false,
                statusCode: 500,
                message: error.message,
                error: error.stack
            })
        }
    }
}
module.exports = new DeliveryController();