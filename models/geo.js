const mongoose = require("mongoose");
var GeoJSON = require('mongoose-geojson-schema');
const route = require('express').Router()
const geoSchema = mongoose.Schema({
  point: mongoose.Schema.Types.Point,
  multipoint: mongoose.Schema.Types.MultiPoint
})
module.exports = mongoose.model("Geo",geoSchema);
