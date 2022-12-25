const Settings = require("../../../Regulation.json")
const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
module.exports = { name: "booster", aliases: ["rich", "zengin"],  desc: "Booster isim değiştirme.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
let KomutChannel = Server.CommandsChannels ? `${Server.CommandsChannels.length > 1 ? Server.CommandsChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.CommandsChannels.map(x => `<#${x}>`).slice(-1) : Server.CommandsChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
if(!Server.CommandsChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if(!message.member.roles.cache.has(Server.BoosterRole)) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
if (Server.BoosterLimit > 0 && boosterLimit.has(message.author.id) && boosterLimit.get(message.author.id) == Server.BoosterLimit) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`Limit Aşımı!\` 15 dakikada **${Server.BoosterLimit}** kere booster komutunu uygulayabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
const ServerTAG = message.member.user.username.includes(Server.ServerMainTag) ? Server.ServerMainTag : ("⦁" === "" ?  Server.ServerMainTag : "⦁");
let Nickname = args.join(' ')
if(!Nickname) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} \`İsim Belirt!\` Lütfen geçerli bir isim belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
message.channel.send({embeds: [Embedcik.setDescription(`Tebrikler kullanıcı adını \`${ServerTAG} ${Nickname}\` olarak değiştirdin.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
client.channels.cache.find(a => a.name === "booster-log").send({embeds: [Embedcik.setDescription(`${message.author} (\`${message.author.id}\`) adlı üye boostunu kullanarak kullanıcı adını \`${ServerTAG} ${Nickname}\` olarak değiştirdi.`)] })
await message.member.setNickname(`${ServerTAG} ${Nickname}`)
if (Server.BoosterLimit > 0) { if (!boosterLimit.has(message.author.id)) boosterLimit.set(message.author.id, 1);
else boosterLimit.set(message.author.id, boosterLimit.get(message.author.id) + 1);
setTimeout(() => { if (boosterLimit.has(message.author.id)) boosterLimit.delete(message.author.id);}, 1000 * 60 * 15)};  


}
}
