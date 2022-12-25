const Settings = require("../../../Regulation.json")
const AfkDB = require("../../Helpers/MongooseSchemas/AwaitFromKeyboard")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = { name: "afk", aliases: ["awaitfromkeyboard", "afkyım"],  desc: "Afk'ya geçme.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let AfkSebeb = args.join(" ") || "Sebeb belirtilmedi!";
if(message.member.displayName.includes("[AFK]")) return
if (AfkSebeb.includes("discord.gg") || AfkSebeb.includes("@everyone") || AfkSebeb.includes("@here") || AfkSebeb.includes(message.mentions.roles.first())) {
message.reply({ embeds: [Embedcik.setDescription(`Afk moduna giriş yaparken afk sebebine rol veya link belirtemezsin`,{ disableMentions: "everyone" })] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`); return;}
AfkDB.findOne({memberID: message.author.id}, (err, res)  => {
if(!res) { new AfkDB({Afk: true, Reason: AfkSebeb, datenow: Date.now(), memberID: message.author.id}).save() } else { res.Reason = AfkSebeb, res.datenow = Date.now(), res.save() }
message.reply({ embeds: [Embedcik.setDescription(`${author} başarılı bir şekilde afk moduna giriş yaptın. [ \`${AfkSebeb}\` ]`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)})
message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(err => message.channel.send(err.message));

}}