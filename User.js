const mongoose = require("mongoose");

module.exports = mongoose.model("User",mongoose.Schema({
	name: String,
	id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true,
    },
	password: String
}));
