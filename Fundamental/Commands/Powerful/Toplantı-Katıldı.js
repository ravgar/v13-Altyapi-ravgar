const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Settings = require("../../../Regulation.json")
module.exports = { name: "katıldı-dagıt", aliases: ["katıldıver", "katıldıdağıt"],  desc: "En son silinen mesajı görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol)) ) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} Odadaki yetkililere katıldı permi veriliyor. Bu işlem uzun sürebilir.`)
let toplantıdaOlanlarx = message.member.voice.channel.members.filter(x => {
    return !x.roles.cache.has(Server.ToplantıRole)
}).map(x => x.id)
for (let i = 0; i < toplantıdaOlanlarx.length; i++) {
    setTimeout(() => {
        message.guild.members.cache.get(toplantıdaOlanlarx[i]).roles.add(Server.ToplantıRole)
    }, (i + 1) * 1000)
}
message.channel.send("Odadaki tüm yetkililere katıldı permi başarıyla verildi.")

}}