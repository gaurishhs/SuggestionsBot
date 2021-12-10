const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Suggest Something For The Server!')
    .addStringOption(option => option.setName('suggestion').setDescription('Enter the Suggestion').setRequired(true)),
    async execute(interaction, client, db) {
        db.collection('guilds').doc(interaction.guild.id).get().then(function (doc1) {
            if (doc1.exists) {
                let data1 = doc1.data()
                if (data1.noresponses === true) {
                    return interaction.reply({ embeds: [client.errorembed.setDescription(`\`${interaction.guild.name}\` is Currently Not Receiving Suggestions.`)] })
                } else {
                    let suggestion = interaction.options.getString('suggestion')
                    client.db.collection('guilds').doc(interaction.guild.id).get().then(function (doc) {
                        if (doc.exists) {
                            let data = doc.data();
                            if (data.suggestionlength && suggestion.length > data.suggestionlength) {
                                if (data.suggestionslice === true) {
                                    suggestion = suggestion.slice(0, data.suggestionlength) + "..."
                                    const suggestionchannel = interaction.guild.channels.cache.get(data.suggestchannel)
                                    if (suggestionchannel) {
                                        db.collection('guilds').doc(interaction.guild.id).collection('suggestions').add({
                                            postedbyid: interaction.user.id,
                                            postedbyusertag: interaction.user.tag,
                                            postedon: moment().unix(),
                                            suggestion: suggestion,
                                            status: 'waiting'
                                        }).then(doc => {
                                            let suggestionembed = new Discord.MessageEmbed()
                                                .setColor(data.suggestioncolor)
                                                .setFooter(`Silva • UserId: ${interaction.user.id} • ReferenceID: ${doc.id}`)
                                                .setTimestamp()
                                                .addField('__**Suggestion By:**__', `${interaction.user.tag}`)
                                                .addField("__**Suggestion:**__", `\`${suggestion}\``)
                                            suggestionchannel.send({ embeds: [suggestionembed] }).then(message1 => {
                                                message1.react(data.upvoteemoji)
                                                message1.react(data.devoteemoji)
                                                db.collection('guilds').doc(interaction.guild.id).collection('suggestions').doc(doc.id).update({
                                                    messageId: message1.id
                                                })
                                                if(data.dmlogs === true) {
                                                    let userembed = new Discord.MessageEmbed()
                                                    .setTitle('Successfully Sent Your Suggestion!')
                                                    .setDescription(`Hey There ${interaction.user}, Your Suggestion Has Been Sent To The Staff and is Now Awaiting Approval! Congratulations!\n I Will Inform You Once Your Suggestion is either Approved or Denied.`)
                                                    .setColor('#08FF00')
                                                    .addField('Suggestion Message', `[Jump To Message](https://discord.com/channels/${interaction.guild.id}/${suggestionchannel.id}/${message1.id})`)
                                                    interaction.user.send({embeds:[userembed]})
                                                }
                                                interaction.reply({content:'Successfully Sent Your Suggestion.', ephemeral: true })
                                            })
                                        })
                                    }
                                } else if (data.warn === true) {
                                    return interaction.reply({
                                        embeds: [client.errorembed.setDescription(`The length of Suggestion Should Not Be More Than ${data.suggestionlength}!`)]
                                    })
                                }
                            } else {
                                const suggestionchannel = interaction.guild.channels.cache.get(data.suggestchannel)
                                if (suggestionchannel) {
                                    db.collection('guilds').doc(interaction.guild.id).collection('suggestions').add({
                                        postedbyid: interaction.user.id,
                                            postedbyusertag: interaction.user.tag,
                                            postedon: moment().unix(),
                                            suggestion: suggestion,
                                            status: 'waiting'
                                    }).then(doc => {
                                        let suggestionembed = new Discord.MessageEmbed()
                                            .setColor(data.suggestioncolor)
                                            .setFooter(`UserId: ${interaction.user.id} • ReferenceID: ${doc.id}`)
                                            .setTimestamp()
                                            .addField('__**Suggestion By:**__', `${interaction.user.tag}`)
                                            .addField("__**Suggestion:**__", `\`${suggestion}\``)
                                        suggestionchannel.send({ embeds: [suggestionembed] }).then(message1 => {
                                            message1.react(data.upvoteemoji)
                                            message1.react(data.devoteemoji)
                                            db.collection('guilds').doc(interaction.guild.id).collection('suggestions').doc(doc.id).update({
                                                messageId: message1.id
                                            })
                                            if(data.dmlogs === true) {
                                                let userembed = new Discord.MessageEmbed()
                                                .setTitle('Successfully Sent Your Suggestion!')
                                                .setDescription(`Hey There ${interaction.user}, Your Suggestion Has Been Sent To The Staff and is Now Awaiting Approval! Congratulations!\n I Will Inform You Once Your Suggestion is either Approved or Denied.`)
                                                .setColor('#08FF00')
                                                .addField('Suggestion Message', `[Jump To Message](https://discord.com/channels/${interaction.guild.id}/${suggestionchannel.id}/${message1.id})`)
                                                interaction.user.send({embeds:[userembed]})
                                            }
                                            interaction.reply({content:'Successfully Sent Your Suggestion.', ephemeral: true})
                                        })
                                    })
                                }
                            }

                        }
                    })
                }
            }
        })
    }
}