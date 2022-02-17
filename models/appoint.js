const {Schema, model} = require("mongoose");

const appointSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        default: ""
    },
    date:{
        type: [String],
        required: true
    },
    startTime: {
        type: String,
        required: true,
        trim: true
    },
    fabric:{
        type: Boolean,
        default: true
    },
    measureMent: {
        type: Boolean,
        default: true
    },
    totalAmount:{
        type: Number,
        required: true
    }
});

module.exports = model("Appoint", appointSchema, "appoint");

module.exports = model("Appoint", appointSchema, "appoints");