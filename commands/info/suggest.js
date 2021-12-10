const Discord = require('discord.js');
const newString = require('../../utils/StringGen')
const moment = require('moment')

module.exports = {
    name: 'suggest',
    run: async (client, message, args, db) => {
        db.collection('guilds').doc(message.guild.id).get().then(function (doc1) {
            if (doc1.exists) {
                let data1 = doc1.data()
                if (data1.noresponses === true) {
                    return message.reply({ embeds: [client.errorembed.setDescription(`\`${message.guild.name}\` is Currently Not Receiving Suggestions.`)] })
                } else {
                    let suggestion = args.slice(0).join(" ")
                    if (!suggestion) {
                        return message.reply({
                            embeds: [client.errorembed.setDescription('Provide a Suggestion!')]
                        })
                    }
                    client.db.collection('guilds').doc(message.guild.id).get().then(function (doc) {
                        if (doc.exists) {
                            let data = doc.data();
                            if (data.suggestionlength && suggestion.length > data.suggestionlength) {
                                if (data.suggestionslice === true) {
                                    suggestion = suggestion.slice(0, data.suggestionlength) + "..."
                                    const suggestionchannel = message.guild.channels.cache.get(data.suggestchannel)
                                    if (suggestionchannel) {
                                        db.collection('guilds').doc(message.guild.id).collection('suggestions').add({
                                            postedbyid: message.author.id,
                                            postedbyusertag: message.author.tag,
                                            postedon: moment().unix(),
                                            suggestion: suggestion,
                                            status: 'waiting'
                                        }).then(doc => {
                                            let suggestionembed = new Discord.MessageEmbed()
                                                .setColor(data.suggestioncolor)
                                                .setFooter(`Silva • UserId: ${message.author.id} • ReferenceID: ${doc.id}`)
                                                .setTimestamp()
                                                .addField('__**Suggestion By:**__', `${message.author.tag}`)
                                                .addField("__**Suggestion:**__", `\`${suggestion}\``)
                                            suggestionchannel.send({ embeds: [suggestionembed] }).then(message1 => {
                                                message1.react(data.upvoteemoji)
                                                message1.react(data.devoteemoji)
                                                db.collection('guilds').doc(message.guild.id).collection('suggestions').doc(doc.id).update({
                                                    messageId: message1.id
                                                })
                                                if(data.dmlogs === true) {
                                                    let userembed = new Discord.MessageEmbed()
                                                    .setTitle('Successfully Sent Your Suggestion!')
                                                    .setDescription(`Hey There ${message.author.tag}, Your Suggestion Has Been Sent To The Staff and is Now Awaiting Approval! Congratulations!\n I Will Inform You Once Your Suggestion is either Approved or Denied.`)
                                                    .setColor('#08FF00')
                                                    .addField('Suggestion Message', `[Jump To Message](https://discord.com/channels/${message.guild.id}/${suggestionchannel.id}/${message1.id})`)
                                                    message.author.send({embeds:[userembed]})
                                                }
                                            })
                                        })
                                    }
                                } else if (data.warn === true) {
                                    return message.reply({
                                        embeds: [client.errorembed.setDescription(`The length of Suggestion Should Not Be More Than ${data.suggestionlength}!`)]
                                    })
                                }
                            } else {
                                const suggestionchannel = message.guild.channels.cache.get(data.suggestchannel)
                                if (suggestionchannel) {
                                    db.collection('guilds').doc(message.guild.id).collection('suggestions').add({
                                        postedbyid: message.author.id,
                                        postedbyusertag: message.author.tag,
                                        postedon: moment().unix(),
                                        status: 'waiting',
                                        suggestion: suggestion
                                    }).then(doc => {
                                        let suggestionembed = new Discord.MessageEmbed()
                                            .setColor(data.suggestioncolor)
                                            .setFooter(`UserId: ${message.author.id} • ReferenceID: ${doc.id}`)
                                            .setTimestamp()
                                            .addField('__**Suggestion By:**__', `${message.author.tag}`)
                                            .addField("__**Suggestion:**__", `\`${suggestion}\``)
                                        suggestionchannel.send({ embeds: [suggestionembed] }).then(message1 => {
                                            message1.react(data.upvoteemoji)
                                            message1.react(data.devoteemoji)
                                            db.collection('guilds').doc(message.guild.id).collection('suggestions').doc(doc.id).update({
                                                messageId: message1.id
                                            })
                                            if(data.dmlogs === true) {
                                                let userembed = new Discord.MessageEmbed()
                                                .setTitle('Successfully Sent Your Suggestion!')
                                                .setDescription(`Hey There ${message.author.tag}, Your Suggestion Has Been Sent To The Staff and is Now Awaiting Approval! Congratulations!\n I Will Inform You Once Your Suggestion is either Approved or Denied.`)
                                                .setColor('#08FF00')
                                                .addField('Suggestion Message', `[Jump To Message](https://discord.com/channels/${message.guild.id}/${suggestionchannel.id}/${message1.id})`)
                                                message.author.send({embeds:[userembed]})
                                            }
                                        })
                                    })
                                }
                            }

                        }
                    })
                }
            }
        })
        .then(() => {
            message.delete()
        })
    }
}