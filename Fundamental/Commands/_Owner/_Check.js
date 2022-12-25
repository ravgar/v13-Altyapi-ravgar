const Settings = require("../../../Regulation.json")
const guildSettings = require("../../Helpers/MongooseSchemas/guildSettings")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
module.exports = { name: "kontrol", aliases: ["check"],  desc: "Sunucu Kurulum",
execute: async (client, message, args, author, channel, guild, Embedcik, SetupEmbed) => {
if (!message.guild) return;
if (!Settings.BotOwnerID.some(x => x === message.author.id) && message.guild.ownerId != message.member.id) return
let Server = await guildSettings.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
let Taglılar = message.guild.members.cache.filter(s => s.user.username.includes(Server.ServerMainTag) && !s.roles.cache.has(`${Server.Tagges}`))           
let Tagsızlar =  message.guild.members.cache.filter(s => s.roles.cache.has(`${Server.Tagges}`) && !s.user.username.includes(Server.ServerMainTag))
const row = new MessageActionRow().addComponents(
new MessageButton().setCustomId('taglı').setLabel("Taglı kontrol").setStyle('PRIMARY'),
new MessageButton().setCustomId('CANCEL').setLabel("İptal").setStyle('DANGER'),);       
let msg = await message.channel.send({ components: [row],embeds: [Embedcik.setColor("ORANGE").setDescription(`Sunucumuz üzerinde isminde \`${Server.ServerMainTag}\` olup rolü olmayan **${Taglılar.size}** üye!\nSunucumuz üzerinde isminde \`${Server.ServerMainTag}\` olmayıp rolü olan **${Tagsızlar.size}** üye!`)]})
var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (button) => {
    if(button.customId === "taglı") {
        row.components[0].setDisabled(true);
        msg.edit({ components: [row] })
      message.guild.members.cache.filter(s => s.user.username.includes(Server.ServerMainTag) && !s.roles.cache.has(Server.Tagges)).map(x=> x.roles.add(Server.Tagges))                
      message.guild.members.cache.filter(s => s.roles.cache.has(`${Server.Tagges}`) && !s.user.username.includes(Server.ServerMainTag)).map(x=> x.roles.remove(Server.Tagges) )
     button.reply(`Tagı olup rolü olmayan ${Taglılar.size} kişiye taglı rolünü verdim. Tagı olmayıp rolü olan ${Tagsızlar.size} kişiden taglı rolünü aldım.`)
    
} else if(button.customId === "CANCEL") {
    row.components[0].setDisabled(true);
    row.components[1].setDisabled(true);
    msg.edit({ components: [row] })
    button.reply("İşlem iptal edildi!")
}
})
}
}
