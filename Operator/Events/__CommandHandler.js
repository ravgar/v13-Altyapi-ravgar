const client = global.client;
const Settings = require("../../Regulation.json")
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
	if (cmd) {
        cmd.execute(client, message, args, author, channel, guild);
    }
}
module.exports.conf = { name: "message"}

