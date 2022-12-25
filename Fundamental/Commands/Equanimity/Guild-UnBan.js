const Settings = require("../../../Regulation.json")
const ms = require("ms")
const banLimit = new Map();
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
require("moment-duration-format");
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
module.exports = { name: "unban", aliases: ["yasaklamakaldır", "sunucudanbankaldır", "ravgarunban"],  desc: "Taslak Komut",
execute: async (client, message, args, channel, guild, SetupEmbed) => {
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.BanAuth.some(rol => message.member.roles.cache.has(rol)) && !Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const Member = message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0]);
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const unBanReason = args.splice(1).join(" ");
if(!unBanReason) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Sebep Belirtilmedi\` Lütfen geçerli bir sebep belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Member === message.member.id) return  message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı İşlem\` Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
message.guild.bans.fetch().then(async(yasaklar)=> {
if(yasaklar.size == 0) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Yasaklı yok!\` Sunucudan hiç bir kullanıcı yasaklanmamış.`)
let yasakliuye = yasaklar.find(yasakli => yasakli.user.id == Member.id)
if(!yasakliuye) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Belirtilen Üye Yasaklı Değil!\` Lütfen geçerli bir üye belirt ve tekrar dene.`);
await Punitives.findOne({Member: Member.id, Type: "BAN", Active: true}).exec(async (err, res) => {
if(res) await Punitives.updateOne({ No: res.No }, { $set: { "Active": false, Remover: message.member.id} }, { upsert: true }).exec();})
await message.guild.members.unban(Member.id);}),
message.reply(`:yo_yo: ${Member} (\`${Member.tag}\` - \`${Member.id}\`) Adlı üye sunucu yasağını ${message.author}, \`${unBanReason}\` gerekçesiyle kaldırdı.`)
client.channels.cache.find(a => a.name === "ban-log").send({embeds: [new MessageEmbed().setColor("GREEN").setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setDescription(`${Member} (\`${Member.id}\`) isimli üyenin sunucu yasağı **${moment(Date.now()).locale("tr").format('LLL')}** tarihinde ${message.author} (\`${message.author.id}\`) tarafından \`${unBanReason}\` gerekçesiyle kaldırıldı.`)]})}}