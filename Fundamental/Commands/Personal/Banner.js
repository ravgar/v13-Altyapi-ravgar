const Settings = require("../../../Regulation.json")
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = { name: "banner", aliases: ["bnner", "afiş"],  desc: "Bannerını görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
let KomutChannel = Server.CommandsChannels ? `${Server.CommandsChannels.length > 1 ? Server.CommandsChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.CommandsChannels.map(x => `<#${x}>`).slice(-1) : Server.CommandsChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
if(!Server.CommandsChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(Server.UnregisterRoles.some(rol => message.member.roles.cache.has(rol))) return;
let Member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
const bannerHash = (await client.api.users[Member.id].get()).banner;
if(!bannerHash) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hata!\` Belirtilen Üyenin Arkaplanı Bulunmadı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
const banner = !bannerHash ? `https://images-ext-2.discordapp.net/external/-OXbEcwb-h30h0TQmUM7xCOemMmn4lZeJtZMpSgWMtg/%3Fsize%3D4096/https/cdn.discordapp.com/banners/852681367853465610/a_364822477a2e994552905134288a64b2.gif` : `https://cdn.discordapp.com/banners/${     victim.id}/${bannerHash}${bannerHash.startsWith("a_") ? ".gif" : ".png"}?size=4096`; 
const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel(`Resim URL`).setStyle(5).setURL(Banner),)    
let msg = await message.channel.send({ components: [row], embeds: [Embedcik.setImage(banner).setDescription(`**${Member.tag || Member.user.author}** Kullanıcısının Banner'ı`)]})
}
}
