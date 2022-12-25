const Settings = require("../../../Regulation.json")
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = { name: "avatar", aliases: ["av", "pp"],  desc: "Avatarını görüntüle",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
let KomutChannel = Server.CommandsChannels ? `${Server.CommandsChannels.length > 1 ? Server.CommandsChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.CommandsChannels.map(x => `<#${x}>`).slice(-1) : Server.CommandsChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
if(!Server.CommandsChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(Server.UnregisterRoles.some(rol => message.member.roles.cache.has(rol))) return;
let Member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
const AvatarRow = new MessageActionRow().addComponents(new MessageButton().setLabel(`Resim URL`).setStyle(5).setURL(Member.displayAvatarURL({ dynamic: true, size: 4096 })))    
let Message = await message.channel.send({ components: [AvatarRow], embeds: [Embedcik.setImage(Member.displayAvatarURL({ dynamic: true, size: 4096 })).setDescription(`**${Member.tag || Member.user.author}** Kullanıcısının Avatar'ı`)]})
var filter = (button) => button.user.id === message.author.id;
const collector = Message.createMessageComponentCollector({ filter, time: 30000 })}}