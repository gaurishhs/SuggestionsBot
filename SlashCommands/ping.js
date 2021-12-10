const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get The Bot\'s Latency.'),
    async execute(interaction, client) {
        client.shard
        .broadcastEval(c => c.ws.ping)
        .then(values => {
            const embed = new Discord.MessageEmbed()
            .setTitle('Ping Successful!')
            .setColor('AQUA')
            .addFields(
                {
                    name: 'Shard 1:',
                    value: `${values[0]}ms`
                },
                {
                    name: 'Shard 2:',
                    value: `${values[1]}ms`
                },
                {
                    name: 'Shard 3:',
                    value: `${values[2]}ms`
                },
                {
                    name: 'Shard 4:',
                    value: `${values[3]}ms`
                }
            )
            return interaction.reply({embeds:[embed]})
        });
    }
}