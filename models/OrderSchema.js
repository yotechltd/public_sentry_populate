const {Schema, model} = require("mongoose");

const ThirdPartyOrderSchema = new Schema({
    quantityOrder:{
        type: Number,
        default: 0
    },
    orderOrigin: {
        type: String,
        required: true
    },
    orderId:{
        type: String,
        required: true
    },
    rid: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        default: 0
    },
    total_app_price: {
        type: Number,
        default: 0
    },
    cashAmount: {
        type: Number,
        default: 0
    },
    cardAmount: {
        type: Number,
        default: 0
    },
    cardOrder: {
        type: Number,
        default: 0
    },
    cashOrder: {
        type: Number,
        default: 0
    },
    deliveryOrderCount:{
        type: Number,
        default: 0
    },
    deliveryCashAmount: {
        type: Number,
        default: 0
    },
    deliveryCardAmount: {
        type: Number,
        default: 0
    },
    deliveryOrderTotalAmount: {
        type: Number,
        default: 0
    },
    collectionOrderCount:{
        type: Number,
        default: 0
    },
    collectionOrderCashAmount: {
        type: Number,
        default: 0
    },
    collectionOrderCardAmount: {
        type: Number,
        default: 0
    },
    collectionOrderTotalAmount: {
        type: Number,
        default: 0
    },
    walkInOrderCount:{
        type: Number,
        default: 0
    },
    walkInOrderCashAmount: {
        type: Number,
        default: 0
    },
    walkInOrderCardAmount: {
        type: Number,
        default: 0
    },
    walkInOrderTotalAmount: {
        type: Number,
        default: 0
    },
    dineInOrderCount:{
        type: Number,
        default: 0
    },
    dineInOrderCashAmount: {
        type: Number,
        default: 0
    },
    dineInOrderCardAmount: {
        type: Number,
        default: 0
    },
    dineInOrderTotalAmount: {
        type: Number,
        default: 0
    },
    walkInOrderCount:{
        type: Number,
        default: 0
    },
    barOrderCashAmount: {
        type: Number,
        default: 0
    },
    barOrderCardAmount: {
        type: Number,
        default: 0
    },
    barOrderTotalAmount: {
        type: Number,
        default: 0
    },
    bookingOrderCount:{
        type: Number,
        default: 0
    },
    bookingOrderCashAmount: {
        type: Number,
        default: 0
    },
    bookingOrderCardAmount: {
        type: Number,
        default: 0
    },
    bookingOrderTotalAmount: {
        type: Number,
        default: 0
    }
});

module.exports = model("ThirdPartyOrder", ThirdPartyOrderSchema, "thirdPartyOrder");