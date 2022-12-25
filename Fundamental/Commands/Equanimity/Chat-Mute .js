const Settings = require("../../../Regulation.json")
const ms = require("ms")
const chatMuteLimit = new Map();
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
require("moment-duration-format");
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
module.exports = { name: "mute", aliases: ["cmute", "chatsustur", "chatmute"],  desc: "Taslak Komut",
execute: async (client, message, args, channel, guild, SetupEmbed) => {
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!Server.MutedRole) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Muted Rolü Tanımlı değil\` Lütfen C-Muted rolünü tanımla.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let MutedRole = Server.MutedRole
if(!message.member.permissions.has("8") && !Server.ChatAuth.some(rol => message.member.roles.cache.has(rol)) && !Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Server.CmuteLimit > 0 && chatMuteLimit.has(message.author.id) && chatMuteLimit.get(message.author.id) == Server.CmuteLimit) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Saatlik ChatMute limitini doldurdun!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let MuteThisCheck = await Punitives.findOne({guildID: message.guild.id, victimID: Member.id, Type: "CHAT-MUTE", Active: true})
if(Server.AllOffStaffPerms.some(rol => Member.roles.cache.has(rol))) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Yetkililere Mute atamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member === message.member.id) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.user.bot) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Botlara ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (!Member.manageable) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üyeye ceza-i işlem uygulamaz için yetkim yeterli değil.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.roles.highest.position >= message.member.roles.highest.position) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye seninle aynı veya senden üst bir rolde oldugu için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(MuteThisCheck) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye zaten ses kanallarında susturulmuş.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const sebeps = [{ label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "5 Dakika", emoji: {name: "1️⃣"} , value: "1", date: "1m", type: 5},{ label: "Flood,Spam ve Capslock Kullanımı", description: "10 Dakika", emoji: {name: "2️⃣"} ,value: "2", date: "10m", type: 5},{ label: "Metin Kanallarını Amacı Dışında Kullanmak", description: "10 Dakika", emoji: {name: "3️⃣"} ,value: "3", date: "10m", type: 5},{ label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "15 Dakika", emoji: {name: "4️⃣"} ,value: "4", date: "15m", type: 5},{ label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "14 Gün", emoji: {name: "5️⃣"} ,value: "5", date: "14d", type: 5},{ label: "Sunucu Kötüleme ve Kişisel Hakaret", description: "1 Saat", emoji: {name: "6️⃣"} ,value: "6", date: "1h", type: 5},{ label: "Abartı, Küfür ve Taciz Kullanımı", description: "30 Dakika", emoji: {name: "7️⃣"}, value: "7", date: "30m", type: 5},{ label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "15 Dakika", emoji: {name: "1️⃣"} , value: "8", date: "15m", type: 4},{ label: "Abartı, Küfür ve Taciz Kullanımı", description: "15 Dakika", emoji: {name: "2️⃣"} ,value: "9", date: "15m", type: 4},{ label: "Ses Kanallarını Amacı Dışında Kullanmak", description: "15 Dakika", emoji: {name: "3️⃣"} ,value: "10", date: "15m", type: 4},{ label: "Özel Odalara İzinsiz Giriş ve Trol", description: "30 Dakika", emoji: {name: "4️⃣"} ,value: "11", date: "30m", type: 4},{ label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "15 Dakika", emoji: {name: "5️⃣"} ,value: "12", date: "15m", type: 4},{ label: "Soundpad, Efekt ve Ses Programları Kullanımı", description: "1 Saat", emoji: {name: "6️⃣"} ,value: "13", date: "1h", type: 4},{ label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "14 Gün", emoji: {name: "7️⃣"} ,value: "14", date: "14d", type: 4},{ label: "Sunucu Kötüleme ve Kişisel Hakaret", description: "1 Saat", emoji: {name: "8️⃣"} ,value: "15", date: "1h", type: 4} ]   
let msg = await message.channel.send({content: `${Member} adlı üyeyi hangi gerekçe ile metin kanallarında susturmak istediğinizi aşağıdaki menüden belirt.`, components: [new MessageActionRow().addComponents(
new MessageSelectMenu().setCustomId(`sebep`).setPlaceholder('Susturmak istediğiniz sebepi seçiniz!').addOptions([sebeps.filter(x => x.type == 5)]),)]})
const filter = i => i.user.id == message.member.id 
const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })
collector.on('collect', async i => {
if (i.customId === `sebep`) {
let seçilenSebep = sebeps.find(x => x.value == i.values[0])
if(seçilenSebep) {
i.deferUpdate()  
msg.delete().catch(err => {})
if (Server.CmuteLimit > 0) { if (!chatMuteLimit.has(message.author.id)) chatMuteLimit.set(message.author.id, 1);
else chatMuteLimit.set(message.author.id, chatMuteLimit.get(message.author.id) + 1);
setTimeout(() => { if (chatMuteLimit.has(message.author.id)) chatMuteLimit.delete(message.author.id);}, 1000 * 60 * 60)};    
message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_cmuted")} ${Member} (\`${Member.user.tag || Member.tag}\` - \`${Member.id}\`) Adlı üye metin kanallarında \`${seçilenSebep.label}\` gerekçesiyle \`${moment.duration(ms(seçilenSebep.date)).format('Y [yıl,] M [ay,] d [gün,] h [saat,] m [dakika]')}\` boyunca ceza-i işlem uygulandı.`)
message.react(client.emojis.cache.find(x => x.name === "ravgar_onay"))
client.channels.cache.find(a => a.name === "chat-mute-log").send({embeds: [new MessageEmbed().setColor("ORANGE").setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${Member} (\`${Member.id}\`) isimli üye **${moment(Date.now()).locale("tr").format('LLL')}** tarihinde ${message.author} (\`${message.author.id}\`) tarafından \`${seçilenSebep.label}\` gerekçesiyle \`${moment.duration(ms(seçilenSebep.date)).format('Y [yıl,] M [ay,] d [gün,] h [saat,] m [dakika]')}\` boyunca ses kanallarında susturuldu.`)]})
if(Member) await Member.roles.add(MutedRole).catch(err => {})
let count = await Punitives.countDocuments().exec();
count = count == 0 ? 1 : count + 1;
let Penal = await new Punitives({ No: count, guildID: Settings.guildID, execID: message.author.id, victimID: Member.id, Active: true, Reason: seçilenSebep.label, nowDate: Date.now(), finishDate: Date.now()+ms(seçilenSebep.date),   Type: "CHAT-MUTE"}).save()
} else {
return i.update({components: [], content: `İşlem sırasında hata oluştu lütfen bot sahibine başvurun.`})}}})}}