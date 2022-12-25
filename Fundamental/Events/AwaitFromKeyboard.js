const Database = require("../Helpers/MongooseSchemas/AwaitFromKeyboard")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = message => {
  if(message.content.startsWith('.afk')) return
    let author = message.author
    Database.findOne({Afk: true}, (err, res) => {
    if(res) {
      let reason =    res.Reason
      if (message.mentions.members.filter(x => x.id !== author.id).some(x => res.memberID.includes(x.id))){
        const victim = message.mentions.users.first()
          if(message.author.bot) return
        if (!res) return;
          message.channel.send(`${victim} adlı üye \`${reason}\` nedeniyle afk moduna giriş yaptı.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
      } else {
        Database.findOne({Afk: true, memberID: message.author.id}, (err, res) => {
          if(!res) return
          res.delete()
          if(message.member.manageable && message.member.displayName.startsWith('[AFK]')) {
            message.member.setNickname(message.member.displayName.replace(/\[AFK\] ?/gi, ''));
          }
          message.channel.send(`:tada: Tekrardan Hoş Geldin! ${message.author}.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

        })

  
      }

    }
    })


}

module.exports.conf = { name: "message"}
