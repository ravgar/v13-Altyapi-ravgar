const Settings = require("../../../Regulation.json")
const ms = require("ms")
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
require("moment-duration-format");
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
module.exports = { name: "warn", aliases: ["uyarı"],  desc: "Taslak Komut",
execute: async (client, message, args, channel, guild, SetupEmbed) => {
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.WarnAuth.some(rol => message.member.roles.cache.has(rol)) && !Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])     
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Reason = args.splice(1).join(" ");
if(!Reason) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Sebep Belirtilmedi\` Lütfen geçerli bir sebep belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member === message.member.id) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.user.bot) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Botlara ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (!Member.manageable) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üyeye ceza-i işlem uygulamaz için yetkim yeterli değil.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.roles.highest.position >= message.member.roles.highest.position) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye seninle aynı veya senden üst bir rolde oldugu için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let count = await Punitives.countDocuments().exec();
count = count == 0 ? 1 : count + 1;
let Penal = await new Punitives({ No: count, guildID: Settings.guildID, execID: message.author.id, victimID: Member.id, Active: true, Reason: Reason, nowDate: Date.now(), finishDate: Date.now(),   Type: "WARN"}).save()
client.channels.cache.find(a => a.name === "warn-log").send({embeds: [new MessageEmbed().setColor("ORANGE").setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${Member} (\`${Member.id}\`) isimli üye **${moment(Date.now()).locale("tr").format('LLL')}** tarihinde ${message.author} (\`${message.author.id}\`) tarafından \`${Reason}\` gerekçesiyle **uyarıldı.**`)]})
message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_warning")} ${Member} (\`${Member.user.tag || Member.tag}\` - \`${Member.id}\`) Adlı üye \`${Reason}\` gerekçesiyle **uyarıldı.**`)

}}