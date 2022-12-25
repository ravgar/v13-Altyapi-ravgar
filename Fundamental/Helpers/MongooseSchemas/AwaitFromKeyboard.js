const mongoose = require("mongoose")
let Schema = mongoose.Schema;
let SchemaBot = Schema({
guildID: { type: Number, default: "" },
Afk: {type: Boolean, default: false},
Reason: String,
datenow: {type: Number, default: Date.now()},
memberID: String,

})
module.exports = mongoose.model("awaitfromkeyboard", SchemaBot);
