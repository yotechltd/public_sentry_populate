const {Schema, model} = require("mongoose");

const delverySchema = new Schema({
    zoneInsideDhaka: {
        type: [String],
        default: []
    },
    zoneInsideDhakaCharge: {
        type: Number,
        required: true
    },
    zoneOutsideDhaka: {
        type: [String],
        default: []
    },
    zoneOutsideDhakaCharge: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    }
});

module.exports = model("Delivery", delverySchema, "delivery")