const Appoint = require("../models/appoint");

module.exports = {
    addAppoint: async(req,res,next)=>{
        try{
            let {title, email, address, phone, name, date, startTime, totalAmount, measureMent, fabric} = req.body;
            if(!title || !address || !phone || !name || !date || !startTime || !totalAmount){
                return res.status(406).json({
                    statusCode: 406,
                    success: false,
                    message: "title, name, address, phone, date, startTime, totalAmount are required!"
                });
            }
            let appoint = new Appoint({
                title,
                email,
                address,
                phone,
                name,
                date,
                startTime,
                totalAmount,
                measureMent,
                fabric
            });
            
            appoint = appoint.save();
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: "Appoint created",
                body: appoint
            })
        }catch(error){
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: error.message
            });
        }
    },
    getAppoint: async (req,res,next)=>{
        try{

        }catch(error){
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: error.message
            });
        }
    },
    getSingleAppoint: async(req,res,next)=>{
        try{

        }catch(error){
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: error.message
            });
        }
    },
    updateAppoint: async(req,res,next)=>{
        try{

        }catch(error){
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: error.message
            });
        }
    },
    deleteAppoint: async(req,res,next)=>{
        try{

        }catch(error){
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: error.message
            });
        }
    }
}