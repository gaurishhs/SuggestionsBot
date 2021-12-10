const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Get Information For The Bot'),
    async execute(interaction, client) {
        const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Silva is Suggestions Bot For Discord, The Idea Of This Bot Was Carried Over By Me aka Shinchan#0196 in the late 2020's As One Of My Friends Used To Use Discord Webhooks To Get Up Suggestions For Their Server, But The Webhooks had a Limit of 50 So He and i Decided To Actually Make up a Discord Bot Which Could Actually Solve This Problem, We'd never Thought That We Will Be Making it Publically For Use And I Had To Rewrite The Whole Code in Rust For The Final And Latest Version(1.0.6) of This Bot.`)
        .setColor('AQUA')
        return interaction.reply({embeds:[embed]})
    }
}