const Settings = require("../../../Regulation.json")
const ms = require("ms")
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
require("moment-duration-format");
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
module.exports = { name: "warninfo", aliases: ["uyarı"],  desc: "Taslak Komut",
execute: async (client, message, args, channel, guild, SetupEmbed, Embedcik) => {
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.WarnAuth.some(rol => message.member.roles.cache.has(rol)) && !Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])     
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)

await Punitives.find({ victimID: Member.id, Type: "WARN" }).sort({ ihlal: "descending" }).exec(async (err, res) => {
let listed = res.reverse();
let History = listed.map((x, index) => `\`#${x.No}\` <@${x.execID}> tarafından \`${moment(x.nowDate).locale("tr").format("LLL")}\` tarihinde \`${x.Reason}\` sebebiyle uyarılmış.`).slice(0,99) 
message.reply({embeds: [Embedcik.setColor("ORANGE").setDescription(`${Member} isimli üyenin **${res.length}** tane uyarısı bulunmaktadır ve uyarıları aşağıda listelenmiştir.\n**──────────────────────────**\n${History.join("\n")}\n**──────────────────────────**\n\`!\` Listede herhangi bir hata oldugunu düşünüyorsan ravgar'e ulaşmalısın.`)]})
})
}}