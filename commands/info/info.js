const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'info',
    aliases: ['i'],
    run: async (client, message, args, db) => {
        if(!args[0]) {
            return message.reply({
                embeds: [
                    client.errorembed.setDescription('No Reference ID Has Been Provided!')
                ]
            })
        }
        db.collection('guilds').doc(message.guild.id).collection('suggestions').doc(args[0]).get().then(function (doc) {
            if(doc.exists) {
                let data = doc.data();
                let suggestion = data.suggestion;
                if(suggestion.length > 200) {
                    suggestion = suggestion.slice(0, 200) + "..."
                }
                const embed = new Discord.MessageEmbed()
                .setColor('FUCHSIA')
                .setTitle(`Information For ${args[0]}!`)
                .addFields(
                    {
                        name: 'Posted By: ',
                        value: `${data.postedbyusertag}`,
                        inline: true
                    },
                    {
                        name: 'Posted On: ',
                        value: `<t:${data.postedon}>`,
                        inline: true
                    },
                    {
                        name: 'Suggestion: ',
                        value: `${suggestion}`,
                        inline: true
                    },
                )
                if(data.status === 'waiting') {
                    embed.addField('Status: ', 'Waiting For Action')
                }
                if(data.status == 'approved') {
                    embed.addField('Status: ', `Approved!`)
                }
                if(data.status == 'denied') {
                    embed.addField('Status: ', `Denied!`)
                }
                return message.reply({
                    embeds: [embed]
                })
            }
        })
    }
}