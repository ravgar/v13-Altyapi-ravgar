const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Settings = require("../../../Regulation.json")
const moment = require("moment")
module.exports = { name: "snipe", aliases: ["silinmişmesaj", "silmesaj"],  desc: "En son silinen mesajı görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.OrtaYönetimRoller.some(rol => message.member.roles.cache.has(rol)) &&!Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.GlobalBotCommand)) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let mesaj = client.snipe.get(message.channel.id)
if(!mesaj) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \` Hatalı İşlem \` Bu kanalda silinmiş herhangir mesaj bulunmamakta.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
message.channel.send({ embeds: [Embedcik.setFooter("Silinme Tarih: " + moment(mesaj.createdTimestamp).locale("tr").format("ll") + ", " + moment(mesaj.createdTimestamp).locale("tr").format("LTS")).setColor("ORANGE").setDescription(`${mesaj.content}`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 25000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)}}