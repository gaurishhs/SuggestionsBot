const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ['inv'],
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Useful Links!')
        .setColor('GREEN')
        .setDescription(`[\`Click Here To Invite Me\`](https://silvabot.in.net/invite)\n[\`Click Here To Join The Support Server\`](https://silvabot.in.net/support)`)
        return message.reply({embeds:[embed]})
    }
}