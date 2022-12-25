const mongoose = require("mongoose")
let Schema = mongoose.Schema;
let SchemaBot = Schema({
guildID: { type: Number, default: "" },

//DİĞER
ServerMainTag: {type: String, default: ""},
ServerNoMainTag: {type: String, default: ""},


//Kanal
CommandsChannels: {type: Array, default: ""},
RegisterChannel: {type: String, default: ""},
GeneralChat: {type: String, default: ""},
İnviteLogChannel: {type: String, default: ""},
KuralllarChannel: {type: String, default: ""},
ToplantıChannel: {type: String, default: ""},
photoChatChannel: {type: String, default: ""},



//Roller
RegisterAuth: {type: Array, default: ""},
VoiceAuth: {type: Array, default: ""},
ChatAuth: {type: Array, default: ""},
BanAuth: {type: Array, default: ""},
JailAuth: {type: Array, default: ""},
WarnAuth: {type: Array, default: ""},
AllOffStaffPerms: {type: Array, default: ""},


AltYönetimRolleri: {type: Array, default: ""},
OrtaYönetimRoller: {type: Array, default: ""},
ÜstYönetimRoller: {type: Array, default: ""},
OwnerRolleri: {type: Array, default: ""},
GlobalBotCommand: {type: String, default: ""},

YetkiliAlımRolleri: {type: Array, default: ""},


Tagges: {type: String, default: ""},
manRoles: {type: Array, default: ""},
womanRoles: {type: Array, default: ""},
UnregisterRoles: {type: Array, default: ""},
BoosterRole: {type: String, default: ""},

KatıldıRole: {type: String, default: ""},

MutedRole: {type: String, default: ""},
VMutedRole: {type: String, default: ""},
JailedRole: {type: String, default: ""},
BannedRole: {type: String, default: ""},
SuspiciousRole: {type: String, default: ""},

TaglıAlım: {type: Boolean, default: false },
KüfürEngel: {type: Boolean, default: false },
ReklamEngel: {type: Boolean, default: false },


KayıtsızLimit: {type: Number, default: "0"},
VmuteLimit: {type: Number, default: "0"},
CmuteLimit: {type: Number, default: "0"},
JailLimit: {type: Number, default: "0"},
BanLimit: {type: Number, default: "0"},
BoosterLimit: {type: Number, default: "0"},

})
module.exports = mongoose.model("guildSettings", SchemaBot);
