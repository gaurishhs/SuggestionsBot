const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get Useful Links For The Bot'),
    async execute(interaction, client) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Useful Links!')
        .setColor('GREEN')
        .setDescription(`[\`Click Here To Invite Me\`](https://silvabot.in.net/invite)\n[\`Click Here To Join The Support Server\`](https://silvabot.in.net/support)`)
        return interaction.reply({embeds:[embed]})
    }
}