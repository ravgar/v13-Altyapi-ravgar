const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Settings = require("../../../Regulation.json")
module.exports = { name: "say", aliases: ["sunucubilgi", "sunucusay"],  desc: "En son silinen mesajı görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") &&!Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.GlobalBotCommand)) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
let ServerTag = client.users.cache.filter(x => x.username.includes(Server.ServerMainTag)).size
let SesUser = message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.filter(member => !member.user.bot).size).reduce((a, b) => a + b);
let SesBot = message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.filter(member => member.user.bot).size).reduce((a, b) => a + b);
let TopUser = message.guild.members.cache.size
let Boost = message.guild.premiumSubscriptionCount || "Sunucuda boost takviyesi bulunmamakta."
let OnlineUser = message.guild.members.cache.filter(m => (m.presence && m.presence.status !== "offline")).size
message.channel.send({embeds: [Embedcik.setColor("RANDOM").setDescription(`\`•\` Sunucumuzda aktif __**${OnlineUser}**__ kullanıcı bulunmakta.\n\`•\` Sunucumuzda toplam __**${TopUser}**__ üye bulunmakta.\n\`•\` Sunucumuzun ses kanallarında __**${SesUser || "0"} (+${SesBot})**__ üye bulunmakta.\n\`•\` Sunucumuzda tag alarak bizi destekleyen __**${ServerTag}**__ üye var!\n\`•\` Sunucumuzda toplam __**${Boost}**__ bulunmakta!`)]})}}

