const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Settings = require("../../../Regulation.json")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
const { table } = require('table');
module.exports = { name: "banbilgi", aliases: ["ban-info", "ban-bilgi"],  desc: "En son silinen mesajı görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.BanAuth.some(rol => message.member.roles.cache.has(rol))  && !Server.OrtaYönetimRoller.some(rol => message.member.roles.cache.has(rol)) &&!Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.GlobalBotCommand)) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const whoisuseridd = args[0]
if (isNaN(whoisuseridd)) return message.channel.send('Lütfen geçerli bir kullanıcı ID\'si giriniz.', message.author , message.channel)
const member = await client.users.fetch(whoisuseridd)
let bannedUser = await message.guild.bans.fetch(member.id);
if(!bannedUser) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Belirttiğin üye sunucuda yasaklı değil.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let penal = await Punitives.findOne({ guildID: message.guild.id, victimID: bannedUser.user.id, type: "BAN", Active: true });
if(penal) {

        message.channel.send({embeds: [Embedcik.setColor("GREEN").setDescription(`\`${bannedUser.user.tag}\` isimli üye bir yetkili tarafından bot ile banlanmış ban detayları aşağıda belirtilmiştir.\n**───────────────────────────────────────────**\n\`#${penal.No}\` ceza numaralı ceza-i işlem \`${client.users.cache.get(penal.execID).tag} (${client.users.cache.get(penal.execID).id})\` tarafından \`${moment(penal.nowDate).locale("tr").format("LLL")}\` tarihinde yapılmış\n**───────────────────────────────────────────**\n\`${bannedUser.user.tag} (${bannedUser.user.id})\` isimli üye \`${!penal.Reason ? 'Belirtilmedi!' : penal.Reason}\` sebebiyle yasaklanmış.`)]})


} else {

    message.channel.send({embeds: [Embedcik.setColor("GREEN").setDescription(`\`${bannedUser.user.tag}\` isimli üye sağ-tık yöntemi ile sunucudan banlanmış ban detayları aşağıda belirtilmiştir.\n**───────────────────────────────────────────**\n\`Belirsiz-Ban\` ceza numaralı ceza-i işlem \`Sağ-Tık\` yöntemi ile \`Belirsiz-Zaman\` tarihinde yapılmış\n**───────────────────────────────────────────**\n\`${bannedUser.user.tag} (${bannedUser.user.id})\` isimli üye \`${!bannedUser.reason ? `Belirtilmedi!` : bannedUser.reason}\` sebebiyle yasaklanmış.`)]})

};


}}

