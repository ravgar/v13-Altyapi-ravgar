const GuildSetting = require("../../Helpers/MongooseSchemas/guildSettings")
const Settings = require("../../../Regulation.json")
const Punitives = require("../../Helpers/MongooseSchemas/Punitives")
const moment = require("moment")
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")
const { table } = require('table');
module.exports = { name: "sicil", aliases: ["cezalar", "punitives"],  desc: "En son silinen mesajı görüntüle.",
execute: async (client, message, args, author, channel, guild, Embedcik) => {
if (!message.guild) return;
let Server = await GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
if(!message.member.permissions.has("8") && !Server.OrtaYönetimRoller.some(rol => message.member.roles.cache.has(rol)) &&!Server.ÜstYönetimRoller.some(rol => message.member.roles.cache.has(rol)) && !Server.OwnerRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.GlobalBotCommand)) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar")}`)
const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])     
if(!Member) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar")} \`Üye Belirtilmedi\` Lütfen geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar")}`)
await Punitives.find({ victimID: Member.id }).sort({ ihlal: "descending" }).exec(async (err, res) => {
    let datax = [
        ["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi", "Yetkili"]
    ];

    let dataxe = [
        ["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi", "Yetkili"]
    ];

    let config = {
        border: {
            topBody: ``,
            topJoin: ``,
            topLeft: ``,
            topRight: ``,

            bottomBody: ``,
            bottomJoin: ``,
            bottomLeft: ``,
            bottomRight: ``,

            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,

            joinBody: ``,
            joinLeft: ``,
            joinRight: ``,
            joinJoin: ``
        }
    };
    res.map(x => {
        datax.push([x.No, x.Active == true ? "✅" : "❌",  moment(x.nowDate).locale("tr").format("LLL"), x.Type, x.Reason, message.guild.members.cache.get(x.execID).user.tag])
    })
    res.map(x => {
        dataxe.push([x.No, x.Active == true ? "✅" : "❌",  moment(x.nowDate).locale("tr").format("LLL"), x.Type, x.Reason, message.guild.members.cache.get(x.execID).user.tag])
    })
    let cezaSayi = datax.length - 1
    if(cezaSayi == 0) return message.channel.send(`${Member} kullanıcısının ceza bilgisi bulunmuyor.`)
    let out = table(dataxe, config)
    let outi = table(datax.slice(0, 15), config)
    const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('tumgezelar').setLabel(`Cezaları Dosyala!`).setStyle('SUCCESS'),
    new MessageButton().setCustomId('iptalledeee').setLabel(`Kapat`).setStyle('DANGER'),)  
    let msg = await message.channel.send({ components: [row], content: `${Member} (\`${Member.id}\` - \`${Member.tag || Member.user.tag}\`) isimli üyenin **${cezaSayi}** cezası bulunmaktadır. son **15** cezası aşağıda belirtilmiştir.\`\`\`${outi}\`\`\``})

        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 50000 })
        collector.on('collect', async (button, user) => {    
          if(button.customId === "tumgezelar") { 
            row.components[0].setDisabled(true) 
            row.components[1].setDisabled(false)
            button.update({components: [row], content: `:no_entry_sign: <@${Member.id}> üyesinin cezaları **Dosya Haline** getirip gönderdim. Toplam **${cezaSayi}** Ceza!`,     files: [{
                attachment: Buffer.from(out),
                name: `${Member.user.tag}-${Member.id}-cezalar.txt`
            }]});      
                 }  
      
            if(button.customId === "iptalledeee") { 
                return await button.update({ content: `${Member} isimli üyenin cezalandırılma işlemi başarıyla iptal edildi.`, components: [], embeds: [] })
            }  
        })
        collector.on('end', async (button, reason) => {
            row.components[0].setDisabled(true) 
            row.components[1].setDisabled(true) 
            msg.edit({ components: [row] }); 
            
        })


})
}}

