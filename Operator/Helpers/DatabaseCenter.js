const mongoose = require("mongoose")
const Settings = require("../../Regulation.json")
mongoose.connect(Settings.DatabaseCenter, { useNewUrlParser: true });
mongoose.connection.on("connected", () => { console.log(`Fundamental Database-Center'a Başarılı bir şekilde bağlandı.`)})
mongoose.connection.on("eror", () => { console.log(`Fundamental Database-Center'a bağlanamadı Regulation dosyasını kontrol et!`)})
