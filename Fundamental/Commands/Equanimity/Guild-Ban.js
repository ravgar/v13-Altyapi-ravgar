const Settings = require("../../../Regulation.json")
const ms = require("ms")
const banLimit = new Map();
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
require("moment-duration-format");
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
module.exports = { name: "ban", aliases: ["yasakla", "sunucudanbanla", "ravgarban"],  desc: "Taslak Komut",
execute: async (client, message, args, channel, guild, SetupEmbed) => {
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.BanAuth.some(rol => message.member.roles.cache.has(rol)) && !Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Server.BanLimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == Server.BanLimit) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Saatlik Ban limitini doldurdun!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const BanReason = args.splice(1).join(" ");
if(!BanReason) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Sebep Belirtilmedi\` Lütfen geçerli bir sebep belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(Server.AllOffStaffPerms.some(rol => Member.roles.cache.has(rol))) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Yetkililere Ban atamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member === message.member.id) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.user.bot) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Botlara ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (!Member.manageable) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üyeye ceza-i işlem uygulamaz için yetkim yeterli değil.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member.roles.highest.position >= message.member.roles.highest.position) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Belirttiğin üye seninle aynı veya senden üst bir rolde oldugu için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
Member.send(`Selam ${Member}, **${message.guild.name}** isimli sunucudan  ${message.author.tag} adlı yetkili tarafından \`${BanReason}\` sebebi ile sunucudan banlandın eğerki bir hata oldugunu düşünüyorsan üst yönetim yetkililerimize bir şekilde ulaş ve hatayı bildir!.`).catch(err => {
console.log(`${Member.user.tag} isimli üye ${message.author.tag} tarafından sunucudan yasaklandı fakat kullanıcıya dm üzerinden bilgilendirme mesajını gönderemedim.`)})
await message.guild.members.ban(Member.id, { reason: BanReason + ` Yetkili: ${message.author.id}` }).catch(x => console.log(x))
if (Server.banLimit > 0) { if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
setTimeout(() => { if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);}, 1000 * 60 * 60)};    
message.react(client.emojis.cache.find(x => x.name === "ravgar_onay"))
client.channels.cache.find(a => a.name === "ban-log").send({embeds: [new MessageEmbed().setColor("ORANGE").setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${Member} (\`${Member.id}\`) isimli üye **${moment(Date.now()).locale("tr").format('LLL')}** tarihinde ${message.author} (\`${message.author.id}\`) tarafından \`${BanReason}\` gerekçesiyle sunucudan yasaklandı.`)]})
let count = await Punitives.countDocuments().exec();
count = count == 0 ? 1 : count + 1;
message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_banned")} ${Member} (\`${Member.user.tag || Member.tag}\` - \`${Member.id}\`) Adlı üye ${message.author} tarafından \`${BanReason}\` gerekçesiyle sunucudan yasaklandı. (\`Ceza Numarası: #${count}\`)`)
let Penal = await new Punitives({ No: count, guildID: Settings.guildID, execID: message.author.id, victimID: Member.id, Active: true, Reason: BanReason, nowDate: Date.now(), Type: "BAN"}).save()
}}