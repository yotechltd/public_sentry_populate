const menuController = require("../controller/menu.controller");

const route = require("express").Router();
route.get("/test",(req,res)=>{
    return res.json({
        statusCode: 200,
        success: true
    })
})
route.get("/test-jest", (req,res)=>{
    menuController.add
});
route.put("/test", menuController.substr)
module.exports = route;