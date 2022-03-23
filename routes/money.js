const route = require('express').Router();
const mongoose = require('mongoose');
route.get("/spent-money", async(req,res)=>{
    try{
        let value = await mongoose.connection.db.collection("spentmoneys").aggregate([{
            $group: {
                _id: {
                    date: "$date",
                    month: "$month"
                },
                money: {
                    $sum: "$spentMoney"
                }
            }
        },{
            $project: {
                money: "$money",
                date: "$_id.date",
                month: "$_id.month"
            }
        },{
            $group: {
                _id: {
                    month: "$month"
                },
                monthlyTotal: {
                    $sum: "$money"
                },
                dates: {
                    $push: {
                        date: "$date",
                        money: "$money"
                    }
                },
                days: {
                    $sum: 1
                }
            }
        },{
            $unwind: "$dates"
        },{
            $project: {
                month: "$_id.month",
                monthlyTotal: "$monthlyTotal",
                date: "$dates.date",
                money: "$dates.money",
                days: "$days",
                dailyAvg: { "$divide": ["$monthlyTotal", "$days"] },
                _id: false
            }
        }]).toArray();
        res.json({
            value : value
        })
    }catch(error){
        return res.json({
            error: error.stack
        })
    }
});
route.get('/history', async(req,res)=>{
    try{
        let data = await mongoose.connection.db.collection("spentmoneys").aggregate([{
            $match: {
                type: "regular"
            }
        },{
            $group: {
                _id: {
                    date: "$date",
                    month: "$month"
                },
                m: {
                    $sum: "$spentMoney"
                }
            }
        },{
            $project: {
                money: "$m",
                date: "$_id.date",
                month: "$_id.month"
            }
        },{
            $sort: {
                date: -1
            }
            },{
            $group: {
                _id: {
                    month: "$month"
                },
                monthlyTotal: {
                    $sum: "$money"
                },
                dates: {
                    $push: {
                        date: "$date",
                        money: "$money"
                    }
                },
                days: {
                    $sum: 1
                }
            }
        },{
            $project: {
                avgCost: {$divide:["$monthlyTotal", "$days"]},
                _id: "$_id.month",
                total: "$monthlyTotal",
                dates: true,
            }
        },{
            $sort: {
                _id: -1
            }
            }]).toArray()
        return res.json({
            success: true,
            body: data
        });
    }catch(error){
        return res.json({
            error: error.stack
        })
    }
})
module.exports = route;