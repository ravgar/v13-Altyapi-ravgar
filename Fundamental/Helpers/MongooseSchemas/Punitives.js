const mongoose = require("mongoose")
let Schema = mongoose.Schema;
let SchemaBot = Schema({

guildID: { type: Number, default: "" },
No: Number,
execID: String,
victimID: String,
Active: { type: Boolean, default: true},
Reason: String,
Type: String,
finishDate: Number,
nowDate: Number,
Remover: String,

})
module.exports = mongoose.model("punitives", SchemaBot);
