const client = global.client;
const Settings = require("../../Regulation.json")
const Database = require("../Helpers/MongooseSchemas/AwaitFromKeyboard")
const { Collection, MessageAttachment, MessageEmbed, Message, ReactionEmoji } = require("discord.js")
module.exports = (message) => {
    if (message.author.bot) return;
    if(!message.guild) return;
    if (Settings.Prefix && !message.content.startsWith(Settings.Prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
	const author = message.author
    const channel = message.channel
    const guild = message.guild
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
	const Embedcik = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})}).setFooter({text: (Settings.BotSetFooter)})
	const SetupEmbed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})})
    if (cmd) {
        cmd.execute(client, message, args, author, channel, guild, Embedcik, SetupEmbed, kullanıcı)
    }
  }
module.exports.conf = { name: "message"}

