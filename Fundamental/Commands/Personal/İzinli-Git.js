const Settings = require("../../../Regulation.json")
const boosterLimit = new Map();
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
module.exports = { name: "igit", aliases: ["izingit", "izinligit"],  desc: "Git komutu.",
execute: async (client, message, args, author, channel, guild, Embedcik, kullanıcı) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
let KomutChannel = Server.CommandsChannels ? `${Server.CommandsChannels.length > 1 ? Server.CommandsChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.CommandsChannels.map(x => `<#${x}>`).slice(-1) : Server.CommandsChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
if(!Server.CommandsChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(Server.UnregisterRoles.some(rol => message.member.roles.cache.has(rol))) return;
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!Member) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Lütfen geçerli bir kullanıcı belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (!message.member.voice.channel) { return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Komutu kullanmak için bir ses kanalında olman gerekli.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
if (message.member.voice.channel === Member.voice.channel) { return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye ile zaten aynı kanaldasın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
if (!Member.voice.channel) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye herhangi bir ses kanalına bağlı değil.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.user.bot) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Secenek = new MessageActionRow().addComponents( new MessageButton().setCustomId('onayla').setLabel(`Onayla`).setStyle('SUCCESS'), new MessageButton().setCustomId('reddet').setLabel(`Reddet`).setStyle('DANGER'),)
let Mesaj = await message.channel.send({ components: [Secenek], embeds: [Embedcik.setDescription(`Hey ${message.author}, aşağıda bulunan butonlara tıklayarak odaya gelip gelmemesini belirtebilirsin.`)], content: `${kullanıcı}` }); message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
var filter = (button) => button.user.id === Member.id;
const collector = Mesaj.createMessageComponentCollector({ filter, time: 30000 })
collector.on('collect', async (button, user) => {      
if(button.customId === "onayla") { Mesaj.delete()
message.member.voice.setChannel(Member.voice.channel.id)
button.channel.send({embeds: [Embedcik.setColor("GREEN").setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} ${Member} adlı kullanıcı odaya bağlanma istediğinizi onayladı.`)] })}
if(button.customId === "reddet") { 
button.channel.send({embeds: [Embedcik.setColor("RED").setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} ${Member} adlı kullanıcı odaya bağlanma istediğinizi reddetti.`)] })}})}}
    


