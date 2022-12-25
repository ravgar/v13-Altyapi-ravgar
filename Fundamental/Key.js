const { Client, Collection, Intents } = require("discord.js");
const FundamentalClient = global.client = new Client({ intents: [32767] });
const { readdir } = require("fs");
const Constantine = require("../Regulation.json")
const commands = FundamentalClient.commands = new Collection();
const aliases = FundamentalClient.aliases = new Collection();
//-
FundamentalClient.Snipe = new Set()
FundamentalClient.snipe = new Map()

//-
require("./Helpers/DatabaseCenter")
//-
readdir("./Commands/", (err, files) => {
if (err) console.error(err)
files.forEach(f => {
readdir("./Commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {
let prop = require(`./Commands/${f}/` + file);
commands.set(prop.name, prop);
prop.aliases.forEach(alias => {
aliases.set(alias, prop.name); });});});});}, console.log(`Fundamental Komutları Yüklendi!`));
//--
readdir("./Events/", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {
let prop = require(`./Events/${file}`);
if (!prop.conf) return;
FundamentalClient.on(prop.conf.name, prop);})
}, console.log(`Fundamental Eventleri Yüklendi!`));
//--
FundamentalClient
.login(Constantine.FundamentalToken)
.then(() => console.log("Fundamental Botuna başarılı bir şekilde bağlanıldı."))
.catch(() => console.log("Fundamental Botuna bağlanılamadı Regulation dosyasını kontrol et!"));

//-
