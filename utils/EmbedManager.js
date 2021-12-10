const Discord = require('discord.js')
module.exports = {
    newErrorEmbed: new Discord.MessageEmbed()
    .setTitle('❌ __**ERROR**__ ❌')
    .setColor('#FF0000')
    .setFooter('Silva'),
    newSuccessEmbed: new Discord.MessageEmbed()
    .setTitle('✅ __**SUCCESS**__ ✅')
    .setColor('#08FF00')
    .setFooter('Silva')
}