const Settings = require("../../../Regulation.json")
const ms = require("ms")
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
require("moment-duration-format");
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
module.exports = { name: "unmute", aliases: ["ucmute", "unvmute"],  desc: "Taslak Komut",
execute: async (client, message, args, channel, guild, SetupEmbed) => {
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.VoiceAuth.some(rol => message.member.roles.cache.has(rol)) && !Server.ChatAuth.some(rol => message.member.roles.cache.has(rol)) &&  !Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let CMuteThisCheck = await Punitives.findOne({guildID: message.guild.id, victimID: Member.id, Type: "VOICE-MUTE", Active: true})
let VMuteThisCheck = await Punitives.findOne({guildID: message.guild.id, victimID: Member.id, Type: "CHAT-MUTE", Active: true})

if(Server.AllOffStaffPerms.some(rol => Member.roles.cache.has(rol))) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Yetkililere Mute atamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member === message.member.id) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Kendine ceza-i işlem kaldırma uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.user.bot) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Botlara ceza-i işlem kaldırma uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (!Member.manageable) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üyeye ceza-i işlem kaldırma uygulamaz için yetkim yeterli değil.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.roles.highest.position >= message.member.roles.highest.position) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye seninle aynı veya senden üst bir rolde oldugu için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(!CMuteThisCheck && !VMuteThisCheck ) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye zaten ses veya metin kanallarında susturulmamış.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const krow = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('uncmute').setLabel(`Chat Mute`).setEmoji(client.emojis.cache.find(x => x.name === "ravgar_mesaj")).setStyle('PRIMARY'),
    new MessageButton().setCustomId('unvmute').setLabel(`Voice Mute`).setEmoji(client.emojis.cache.find(x => x.name === "ravgar_ses")).setStyle('PRIMARY'),
    new MessageButton().setCustomId('iptalle').setLabel(`İPTAL`).setEmoji(client.emojis.cache.find(x => x.name === "ravgar_carpi")).setStyle('DANGER'),)
let msg = await message.channel.send({content: `${Member} adlı üyenin hangi türde ceza-i işlemini kaldırtmak istediğini aşağıdaki butonlar ile belirt.`, components: [krow]})
const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })
var filter = (button) => button.user.id === message.author.id;
collector.on('collect', async (button, user) => {      
    if(button.customId === "uncmute") {
        msg.delete()
        if(Server.MutedRole) await Member.roles.remove(Server.MutedRole).catch(err => {})
        Punitives.find({ victimID: Member.id, guildID: message.guild.id, Active: true, Type: "CHAT-MUTE" }, async function (err, ChatMute) { for (var ravgar of ChatMute) { ravgar.Active = false, ravgar.save()}})
        message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} ${Member} isimli üyenin Chat-Mute cezası başarılı bir şekilde kaldırıldı.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
        client.channels.cache.find(a => a.name === "chat-mute-log").send({embeds: [new MessageEmbed().setColor("GREEN").setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${Member} (\`${Member.id}\`) isimli üyenin chat susturma cezası **${moment(Date.now()).locale("tr").format('LLL')}** tarihinde ${message.author} (\`${message.author.id}\`) tarafından kaldırıldı.`)]})
        message.react(client.emojis.cache.find(x => x.name === "ravgar_tik"))
    }
    if(button.customId === "unvmute") {
        msg.delete()
        Punitives.find({ victimID: Member.id, guildID: message.guild.id, Active: true, Type: "VOICE-MUTE" }, async function (err, VoiceMute) { for (var ravgar of VoiceMute) { ravgar.Active = false, ravgar.save()}})
        message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} ${Member} isimli üyenin Voice-Mute cezası başarılı bir şekilde kaldırıldı.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
        if(Server.VMutedRole) await Member.roles.remove(Server.VMutedRole).catch(err => {})
        if (Member.voice.channel) Member.voice.setMute(false)
        client.channels.cache.find(a => a.name === "ses-mute-log").send({embeds: [new MessageEmbed().setColor("GREEN").setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${Member} (\`${Member.id}\`) isimli üyenin ses susturma cezası **${moment(Date.now()).locale("tr").format('LLL')}** tarihinde ${message.author} (\`${message.author.id}\`) tarafından kaldırıldı.`)]})
        message.react(client.emojis.cache.find(x => x.name === "ravgar_tik"))
    }
    if(button.customId === "iptalle") {
        msg.delete()
        message.react(client.emojis.cache.find(x => x.name === "ravgar_tik"))
        message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} işlem başarılı bir şekilde iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    }   
})}}