const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands','cmnds'],
    run: async(client, message, args, db) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Help Panel')
        .setDescription(`Commands For Silva Bot!`)
        .setColor('BLURPLE')
        .addFields(
            {
                name: `🛡 Configuration Commands`,
                value: `\`config\``
            },
            {
                name: `ℹ Information Commands`,
                value: `\`info\`, \`help\`,\`ping\`,\`stats\`,\`about\`,\`invite\``
            },
            {
                name: `❔ Suggestion Commands`,
                value: `\`suggest\``
            },
            {
                name: `💂 Admin Commands`,
                value: `\`approve\`,\`deny\``
            },
            {
                name: `\n\nGet Help`,
                value: `Website: [\`Click Here\`](https://silvabot.in.net)*(\`silvabot.in.net\`)*\n Documentation: [\`Click Here\`](https://docs.silvabot.in.net)*(\`docs.silvabot.in.net\`)*\nSupport Server: [\`Click Here\`](https://silvabot.in.net/support)*(\`silvabot.in.net\`)*`
            }
        )
        return message.reply({embeds:[embed]})
    }
}