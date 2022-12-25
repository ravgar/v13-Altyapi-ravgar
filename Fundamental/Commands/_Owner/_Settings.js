const Settings = require("../../../Regulation.json")
const guildSettings = require("../../Helpers/MongooseSchemas/guildSettings")
module.exports = { name: "setup", aliases: ["ayar"],  desc: "Sunucu Kurulum",
execute: async (client, message, args, author, channel, guild, Embedcik, SetupEmbed) => {
if (!message.guild) return;
if (!Settings.BotOwnerID.some(x => x === message.author.id) && message.guild.ownerId != message.member.id) return
let guildSet = await guildSettings.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })

if(args[0] === "man" || args[0] === "erkek" || args[0] === "erkekroles"  || args[0] === "1") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Erkek__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { manRoles: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Erkek Rolleri__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   

if(args[0] === "woman" || args[0] === "kadın" || args[0] === "kadınroles" || args[0] === "2") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Kadın__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { womanRoles: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Kadın Rolleri__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   

if(args[0] === "kayıtsız" || args[0] === "unregister" || args[0] === "kayıtsızrole" || args[0] === "3") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Kayıtsız__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { UnregisterRoles: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Kayıtsız Rolleri__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   

if(args[0] === "registerauth" || args[0] === "kayıtcı" || args[0] === "kayıtcırolleri" || args[0] === "4") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Register Auth__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { RegisterAuth: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Register Auth__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "voiceauth" || args[0] === "vmuteyetki" || args[0] === "voiceyetki" || args[0] === "5") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Voice Mute Auth__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { VoiceAuth: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Voice Mute Auth__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "chatauth" || args[0] === "cmuteyetki" || args[0] === "chatyetki" || args[0] === "6") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Chat Mute Auth__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ChatAuth: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Chat Mute Auth__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "banauth" || args[0] === "banyetki" || args[0] === "banlamayetki" || args[0] === "7") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Ban Auth__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { BanAuth: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Ban Auth__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "jailauth" || args[0] === "jailyetki" || args[0] === "jailciyetki" || args[0] === "8") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Jail Auth__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { JailAuth: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Jail Auth__ ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "tag2" || args[0] === "TAG2" || args[0] === "servertag2" || args[0] === "nomaintag") {
let select = args[1];
if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ServerNoMainTag: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __No-Main-Tag__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      

if(args[0] === "tag" || args[0] === "TAG" || args[0] === "servertag" || args[0] === "maintag") {
let select = args[1];
if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ServerMainTag: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Main-Tag__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}    

if(args[0] === "team" || args[0] === "taglırol" || args[0] === "family" || args[0] === "9") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Family (Tagges)__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { Tagges: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Family (Tagges)__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      

if(args[0] === "rich" || args[0] === "boostrol" || args[0] === "booster" || args[0] === "10") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Booster (Rich)__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { BoosterRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Booster (Rich)__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      

if(args[0] === "vmuted" || args[0] === "sesmuted" || args[0] === "voicemuted" || args[0] === "11") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Voice-Muted__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { VMutedRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Voice-Muted__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      

if(args[0] === "katıldı" || args[0] === "katıldırol" || args[0] === "rolkatıldı" || args[0] === "37") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Toplantı-Katıldı__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { KatıldıRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Toplantı-Katıldı__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      

if(args[0] === "cmuted" || args[0] === "mesajmuted" || args[0] === "chatmuted" || args[0] === "muted" || args[0] === "12") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Chat-Muted__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { MutedRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Chat-Muted__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      

if(args[0] === "jail" || args[0] === "jailed" || args[0] === "cezalı" || args[0] === "cezalısın" || args[0] === "13") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Jail'd__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { JailedRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Jail'd__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}  

if(args[0] === "ytagrol" || args[0] === "bannedtagrol" || args[0] === "yasaklıtagrol" || args[0] === "yasaklıtagrole" || args[0] === "14") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Banned-Tag__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { BannedRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Banned-Tag__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}  


if(args[0] === "supheli" || args[0] === "şüphelirol" || args[0] === "suspicius" || args[0] === "suphelirol" || args[0] === "15") {
let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
if(!rol) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Şüpheli__ Rolünü  __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { SuspiciousRole: rol } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Şüpheli__ ${rol} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}  

if(args[0] === "registerchat" || args[0] === "hosgeldinkanal" ||  args[0] === "welcomekanal" || args[0] === "registerhat" ||  args[0] === "16") {
let kanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
if(!kanal) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Register-Channel__ Kanalı  __GuildSettings__ veritabanına işlemem için kanalı belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { RegisterChannel: kanal.id } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Register-Channel__ ${kanal} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}

if(args[0] === "generalchat" || args[0] === "genelchat" ||  args[0] === "chat" || args[0] === "chating" ||  args[0] === "17") {
let kanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
if(!kanal) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __General-Chat__ Kanalı  __GuildSettings__ veritabanına işlemem için kanalı belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { GeneralChat: kanal.id } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __General-Chat__ ${kanal} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}

if(args[0] === "invlog" || args[0] === "invitelog" ||  args[0] === "invitekanal" || args[0] === "davetkanal" ||  args[0] === "18") {
let kanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
if(!kanal) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __İnvite-Bilgilendirme__ Kanalı  __GuildSettings__ veritabanına işlemem için kanalı belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { İnviteLogChannel: kanal.id } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __İnvite-Bilgilendirme__ ${kanal} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}

if(args[0] === "rules" || args[0] === "ruleschannel" ||  args[0] === "kurallar" || args[0] === "kurallarkanal" ||  args[0] === "19") {
let kanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
if(!kanal) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Sunucu-Kuralları__ Kanalı  __GuildSettings__ veritabanına işlemem için kanalı belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { KuralllarChannel: kanal.id } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Sunucu-Kuralları__ ${kanal} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}

if(args[0] === "toplantıkanal" || args[0] === "toplantı" ||  args[0] === "meeting" || args[0] === "meetingchannel" ||  args[0] === "20") {
let kanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
if(!kanal) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Toplantı Kanalı__ Kanalı __GuildSettings__ veritabanına işlemem için kanalı belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ToplantıChannel: kanal.id } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Toplantı__ ${kanal} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}

if(args[0] === "photochat" || args[0] === "fotochat" ||  args[0] === "photochannel" || args[0] === "fotochannel" ||  args[0] === "21") {
let kanal = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
if(!kanal) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Photo-Chat__ Kanalı __GuildSettings__ veritabanına işlemem için kanalı belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ToplantıChannel: kanal.id } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Photo-Chat__ ${kanal} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}

if(args[0] === "altyönetimroles" || args[0] === "altyönetimrolleri" || args[0] === "altyönetim" || args[0] === "22") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Alt-Yönetim__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { AltYönetimRolleri: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Alt-Yönetim__  ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "ortayönetimroles" || args[0] === "ortayönetimrolleri" || args[0] === "ortayönetim" || args[0] === "23") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Orta-Yönetim__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { OrtaYönetimRoller: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Orta-Yönetim__  ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "üstyönetimroles" || args[0] === "üstyönetimrolleri" || args[0] === "üstyönetim" || args[0] === "24") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Üst-Yönetim__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ÜstYönetimRoller: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Üst-Yönetim__  ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "ownerroles" || args[0] === "ownerrolleri" || args[0] === "owneryönetim" || args[0] === "25") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Owner__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { OwnerRolleri: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Owner__  ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "yetkilialım" || args[0] === "ytalımroller" || args[0] === "yetkilialımroller" || args[0] === "26") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Yetkili-Alım__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { YetkiliAlımRolleri: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Yetkili-Alım__  ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "uyarıyetki" || args[0] === "warnstaff" || args[0] === "warnauth" || args[0] === "36") { 
let Roles;
if(message.mentions.roles.size >= 1)
Roles = message.mentions.roles.map(role => role.id);
else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
if(Roles.length <= 0) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Warn-Auth__ Rollerini __GuildSettings__ veritabanına işlemem için rol(leri) belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { WarnAuth: Roles } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Warn-Auth__  ${Roles.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "taglıalım" || args[0] === "taglialım" || args[0] === "taglıalımcık" || args[0] === "27") { 
if (guildSet.TaglıAlım == true)  {
guildSettings.findOneAndUpdate({guildID: message.guild.id}, {$set: {TaglıAlım: false}}, {upsert: true}).exec()
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Taglı-Alım__ **Açık** iken **Kapatıldı** ve __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
} else {
guildSettings.findOneAndUpdate({guildID: message.guild.id}, {$set: {TaglıAlım: true}}, {upsert: true}).exec()
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Taglı-Alım__ **Kapalı** iken **Açıldı** ve __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 


if(args[0] === "küfürengel" || args[0] === "küfür-engel" || args[0] === "küfürrengel" || args[0] === "28") { 
if (guildSet.KüfürEngel == true)  {
guildSettings.findOneAndUpdate({guildID: message.guild.id}, {$set: {KüfürEngel: false}}, {upsert: true}).exec()
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Küfür Engel__ **Açık** iken **Kapatıldı** ve __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
} else {
guildSettings.findOneAndUpdate({guildID: message.guild.id}, {$set: {KüfürEngel: true}}, {upsert: true}).exec()
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Küfür Engel__ **Kapalı** iken **Açıldı** ve __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "reklamengel" || args[0] === "reklam-engel" || args[0] === "reklammengel" || args[0] === "29") { 
if (guildSet.ReklamEngel == true)  {
guildSettings.findOneAndUpdate({guildID: message.guild.id}, {$set: {ReklamEngel: false}}, {upsert: true}).exec()
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Reklam Engel__ **Açık** iken **Kapatıldı** ve __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
} else {
guildSettings.findOneAndUpdate({guildID: message.guild.id}, {$set: {ReklamEngel: true}}, {upsert: true}).exec()
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Reklam Engel__ **Kapalı** iken **Açıldı** ve __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))}
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "kayıtsız-limit" || args[0] === "kayıtsızlimit" ||  args[0] === "unreglimit" || args[0] === "unregisterlimit" ||  args[0] === "30") {
let select = Number(args[1])
if(!select) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Kayıt-Limit__ Ayarını __GuildSettings__ veritabanına işlemem için **Limit-Sayısını** belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { KayıtsızLimit: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Kayıt-Limit__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}

if(args[0] === "vmute-limit" || args[0] === "vmutelimit" ||  args[0] === "voicemutelimit" || args[0] === "voicemlimit" ||  args[0] === "31") {
let select = Number(args[1])
if(!select) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Voice-Mute-Limit__ Ayarını __GuildSettings__ veritabanına işlemem için **Limit-Sayısını** belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { VmuteLimit: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Voice-Mute-Limit__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "cmute-limit" || args[0] === "cmutelimit" ||  args[0] === "chatmutelimit" || args[0] === "chatmlimit" ||  args[0] === "32") {
let select = Number(args[1])
if(!select) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Chat-Mute-Limit__ Ayarını __GuildSettings__ veritabanına işlemem için **Limit-Sayısını** belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { CmuteLimit: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Chat-Mute-Limit__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "jail-limit" || args[0] === "jaillimit" ||  args[0] === "cezalılimit" || args[0] === "cezalilimit" ||  args[0] === "33") {
let select = Number(args[1])
if(!select) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Jail-Limit__ Ayarını __GuildSettings__ veritabanına işlemem için **Limit-Sayısını** belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { JailLimit: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Jail-Limit__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "ban-limit" || args[0] === "banlimit" ||  args[0] === "yasaklamalimit" || args[0] === "banlimit" ||  args[0] === "34") {
let select = Number(args[1])
if(!select) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Ban-Limit__ Ayarını __GuildSettings__ veritabanına işlemem için **Limit-Sayısını** belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { BanLimit: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Ban-Limit__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

if(args[0] === "booster-limit" || args[0] === "boosterlimit" ||  args[0] === "zenginlimit" || args[0] === "blimit" ||  args[0] === "35") {
let select = Number(args[1])
if(!select) return channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} __Booster-Limit__ Ayarını __GuildSettings__ veritabanına işlemem için **Limit-Sayısını** belirtmen gerek.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(client.emojis.cache.find(x => x.name === "ravgar_carpi"))
await guildSettings.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { BoosterLimit: select } }, { upsert: true }).exec();
channel.send({embeds: [SetupEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} __Booster-Limit__ ${select} olarak __GuildSettings__ veritabanına işlendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

}
}
