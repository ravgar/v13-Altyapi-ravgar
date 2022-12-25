const Settings = require("../../../Regulation.json")
module.exports = { name: "reboot", aliases: ["reload"],  desc: "Bot Restart",
execute: async (client, message, args, author, channel, guild, Embedcik, SetupEmbed) => {
if (!message.guild) return;
if (!Settings.BotOwnerID.some(x => x === message.author.id) && message.guild.ownerId != message.member.id) return
await message.reply(`${client.user} (\`${client.user.tag}\` - \`${client.user.id}\`) isimli bot **yeninden başlatılıyor.**`)
process.exit(0)

}
}
