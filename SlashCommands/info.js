const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info for a suggestion')
    .addStringOption(option => option.setName('refid').setDescription('Enter the RefID For The Suggestion You Need Info About').setRequired(true)),
    async execute(interaction, client, db) {
        const string = interaction.options.getString('refid');
        db.collection('guilds').doc(interaction.guild.id).collection('suggestions').doc(string).get().then(function (doc) {
            if(doc.exists) {
                let data = doc.data();
                let suggestion = data.suggestion;
                if(suggestion.length > 200) {
                    suggestion = suggestion.slice(0, 200) + "..."
                }
                const embed = new Discord.MessageEmbed()
                .setColor('FUCHSIA')
                .setTitle(`Information For ${string}!`)
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
                return interaction.reply({
                    embeds: [embed],
                })
            }
        })
    }
}