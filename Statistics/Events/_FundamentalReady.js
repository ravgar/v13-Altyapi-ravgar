const Settings = require("../../Regulation.json")
const { joinVoiceChannel } = require("@discordjs/voice");
module.exports = () => {
    const VoiceChannel = client.channels.cache.get(Settings._ReadyVoiceChannelID);
	joinVoiceChannel({
		channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true
	});
		client.user.setActivity(Settings._ReadyActivity, {type: Settings._ReadyType, url: Settings._ReadyURL})
}
module.exports.conf = { name: "ready"}

