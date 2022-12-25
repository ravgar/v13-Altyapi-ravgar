const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Settings = require("../../../Regulation.json")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
const { table } = require('table');
module.exports = { name: "banlist", aliases: ["banliste", "banlisted"],  desc: "En son silinen mesajı görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") &&!Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const fetchBans = message.guild.bans.fetch()
fetchBans.then(banned => {
    let list = banned.map(user => `${user.user.id} | ${user.user.tag}`).join('\n');
    message.channel.send(`\`\`\`js
${list}\n\nSunucumuzda toplam ${banned.size} yasaklı kullanıcı bulunmakta. Kişilerin ban nedenlerini öğrenmek icin ${Settings.Prefix}banbilgi ID komutunu uygulamalısın.\`\`\``)

})


}}

