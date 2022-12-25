const Settings = require("../../Regulation.json")
const { joinVoiceChannel } = require("@discordjs/voice");
const moment = require("moment")
const Punitives = require("../Helpers/MongooseSchemas/Punitives")
const GuildSetting = require("../Helpers/MongooseSchemas/guildSettings")
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js")

module.exports = () => {
	setInterval(() => { voice() }, 1000 * 1)
    setInterval(() => { mute() }, 1000 * 5)
	setInterval(() => { jail() }, 1000 * 3)
	setInterval(() => { Rolsüz() }, 1000 * 5)

	
	let guild = client.guilds.cache.get(Settings.guildID)
	let guildSettings = GuildSetting.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
	if (!guildSettings.MutedRole) return;
	const VoiceChannel = client.channels.cache.get(Settings._ReadyVoiceChannelID);
	joinVoiceChannel({
		channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true
	});
	client.user.setActivity(Settings._ReadyActivity, { type: Settings._ReadyType, url: Settings._ReadyURL })
	async function voice() {
		Punitives.find({ guildID: guild.id, Active: true, Type: "VOICE-MUTE" }, async function (err, VoiceMute) {
			if ((!VoiceMute) || (VoiceMute.length < 1)) return null;
			for (var ravgar of VoiceMute) {
				let vMutedKontrol = await GuildSetting.findOne({
					guildID: Settings.guildID })				
				let user = guild.members.cache.get(ravgar.victimID)
				if (!user) return null
				if (Date.now() >= ravgar.finishDate) {
				if (user.roles.cache.has(vMutedKontrol.VMutedRole)) {
				user.roles.remove(vMutedKontrol.VMutedRole)
				ravgar.Active = false
				ravgar.save()}
				if (user.voice.channel) user.voice.setMute(false)
				} else {
				if (!user.voice.serverMute) {
				user.roles.add(vMutedKontrol.VMutedRole)
				if (user.voice.channel) user.voice.setMute(true)}}}})}

async function mute() {
	Punitives.find({ guildID: guild.id, Active: true, Type: "CHAT-MUTE" }, async function (err, ChatMute) {
		if ((!ChatMute) || (ChatMute.length < 1)) return null;
        for (var ravgar of ChatMute) {
			let MutedKontrol = await GuildSetting.findOne({
				guildID: Settings.guildID })			
			let user = guild.members.cache.get(ravgar.victimID)
			if(!user)  return null
			if(Date.now() >= ravgar.finishDate) {
			if(user.roles.cache.has(MutedKontrol.MutedRole)) {
			user.roles.remove(MutedKontrol.MutedRole)
			ravgar.Active = false
			ravgar.save()}
		    } else {
            if(!user.roles.cache.has(MutedKontrol.MutedRole)) {
			user.roles.add(MutedKontrol.MutedRole)}}}})}

async function jail() {
	Punitives.find({ guildID: guild.id, Active: true, Type: "JAIL" }, async function (err, ChatMute) {
		if ((!ChatMute) || (ChatMute.length < 1)) return null;
        for (var ravgar of ChatMute) {
			let JailKontrol = await GuildSetting.findOne({
				guildID: Settings.guildID })			
			let user = guild.members.cache.get(ravgar.victimID)
			if(!user)  return null
			if(Date.now() >= ravgar.finishDate) {
			if(user.roles.cache.has(JailKontrol.JailedRole)) {
			user.roles.remove(JailKontrol.JailedRole)
			user.roles.add(JailKontrol.UnregisterRoles)
			ravgar.Active = false
			ravgar.save()}
			} else {	
            if(!user.roles.cache.has(JailKontrol.JailedRole)) {
			await user.roles.set([JailKontrol.JailedRole],`Cezalıda oldugu için yeniden cezalı permi setlendi.`)
			client.channels.cache.find(a => a.name === "cezalı-log").send({embeds: [new MessageEmbed().setColor("RED").setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})}).setDescription(`${user} (\`${user.id}\`) isimli üye cezalıda olmasına rağmen biri tarafından cezalı rolü çekildi üyenin rollerini yeniden <@&${JailKontrol.JailedRole}> rolüne sabitledim.\nTarih: **${moment(Date.now()).locale("tr").format('LLL')}**`)]})

		}}}})}

		async function Rolsüz() {
				let RolsüzKontrol = await GuildSetting.findOne({
				guildID: Settings.guildID })			
			let bg = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
			bg.forEach(r => {
				r.roles.add(RolsüzKontrol.UnregisterRoles),`Rolsüz oldugu için kayıtsız rolü eklendi.`
			});
  
		}
// [JailRole, BoosterRole]
}
module.exports.conf = { name: "ready" }

