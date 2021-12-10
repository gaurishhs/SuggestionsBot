const Discord = require('discord.js');
const firebase = require('firebase/app')
require('firebase/firestore')

module.exports = {
    name: 'config',
    aliases: ['settings'],
    run: async (client, message, args, db) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply({
                embeds: [client.errorembed.setDescription('You\'re Missing Permissions To Execute This Command.')]
            })
        }
        const options = ['staffroles', 'prefix', 'emojis','embedcolor','suggestionlimit','dmlogs', 'lock']
        if (!args[0]) {
            return message.reply({
                embeds: [
                    client.errorembed.setDescription('No Argument Has Been Provided!').addField(`Available Arguments`, `\`${options.join(" , ")}\``)
                ]
            })
        } else {
            const cmnd = args[0].toLowerCase()
            if (cmnd === 'staffroles') {
                if (!args[1]) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('No Role Has Been Provided!')
                        ]
                    })
                } else {
                    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                    if (!role) {
                        return message.reply({
                            embeds: [
                                client.errorembed.setDescription('Invalid Role Has Been Provided!')
                            ]
                        })
                    } else {
                        db.collection('guilds').doc(message.guild.id).get().then(function (doc) {
                            if(doc.exists) {
                                let data = doc.data();
                                if(data.staffroles.includes(role.id)) {
                                    db.collection('guilds').doc(message.guild.id).update({
                                        staffroles: firebase.firestore.FieldValue.arrayRemove(role.id)
                                    })
                                    return message.reply({
                                        embeds: [client.successembed.setDescription('Successfully Removed Role From Staff Roles.')]
                                    })
                                } else {
                                    db.collection('guilds').doc(message.guild.id).update({
                                        staffroles: firebase.firestore.FieldValue.arrayUnion(role.id)
                                    })
                                    return message.reply({
                                        embeds: [client.successembed.setDescription('Successfully Added Role To Staff Roles.')]
                                    })
                                }
                            }
                        })
                    }
                }
            } else if (cmnd === 'emojis') {
                if (!args[1]) {
                    db.collection('guilds').doc(message.guild.id).get().then(function (doc) {
                        if (doc.exists) {
                            let data = doc.data();
                            let emojiembed = new Discord.MessageEmbed()
                                .setColor('#E8FF00')
                                .setTitle('Config | Emoji Set')
                                .setDescription('Set The Emojis For Your Voting Scheme.')
                            if (data.emojipack === 1) {
                                emojiembed.addFields(
                                    {
                                        name: '** **',
                                        value: `\`1\`: ✅ ❌ **(Current)**\n \`2\`: 👍 👎\n \`3\`: ⬆ ⬇\n \`4\`: <:Silva_Upvote:904308905532870666> <:Silva_Downvote:904309040891453491>\n \`5\`: <:Silva_Upvote:904309932449468456> <:Silva_Downvote:904310011239477278>`
                                    }
                                )
                            }
                            if (data.emojipack === 2) {
                                emojiembed.addFields(
                                    {
                                        name: '** **',
                                        value: `\`1\`: ✅ ❌\n \`2\`: 👍 👎**(Current)**\n \`3\`: ⬆ ⬇\n \`4\`: <:Silva_Upvote:904308905532870666> <:Silva_Downvote:904309040891453491>\n \`5\`: <:Silva_Upvote:904309932449468456> <:Silva_Downvote:904310011239477278>`
                                    }
                                )
                            }
                            if (data.emojipack === 3) {
                                emojiembed.addFields(
                                    {
                                        name: '** **',
                                        value: `\`1\`: ✅ ❌\n \`2\`: 👍 👎\n \`3\`: ⬆ ⬇**(Current)**\n \`4\`: <:Silva_Upvote:904308905532870666> <:Silva_Downvote:904309040891453491>\n \`5\`: <:Silva_Upvote:904309932449468456> <:Silva_Downvote:904310011239477278>`
                                    }
                                )
                            }
                            if (data.emojipack === 4) {
                                emojiembed.addFields(
                                    {
                                        name: '** **',
                                        value: `\`1\`: ✅ ❌\n \`2\`: 👍 👎\n \`3\`: ⬆ ⬇\n \`4\`: <:Silva_Upvote:904308905532870666> <:Silva_Downvote:904309040891453491>**(Current)**\n \`5\`: <:Silva_Upvote:904309932449468456> <:Silva_Downvote:904310011239477278>`
                                    }
                                )
                            }
                            if (data.emojipack === 5) {
                                emojiembed.addFields(
                                    {
                                        name: '** **',
                                        value: `\`1\`: ✅ ❌\n \`2\`: 👍 👎\n \`3\`: ⬆ ⬇\n \`4\`: <:Silva_Upvote:904308905532870666> <:Silva_Downvote:904309040891453491>\n \`5\`: <:Silva_Upvote:904309932449468456> <:Silva_Downvote:904310011239477278>**(Current)**`
                                    }
                                )
                            }
                            return message.reply({ embeds: [emojiembed] })
                        }
                    })
                } else {
                    const array = ['1', '2', '3', '4', '5']
                    if (isNaN(args[1]) || !array.includes(args[1])) {
                        return message.reply({
                            embeds: [
                                client.errorembed.setDescription('Provided Option is Not Valid!')
                            ]
                        })
                    }
                    if (args[1] === '1') {
                        db.collection('guilds').doc(message.guild.id).update({
                            emojipack: 1,
                            upvoteemoji: '✅',
                            devoteemoji: '❌'
                        })
                        return message.reply({
                            embeds: [
                                client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 1.')
                            ]
                        })
                    }
                    if (args[1] === '2') {
                        db.collection('guilds').doc(message.guild.id).update({
                            emojipack: 2,
                            upvoteemoji: '👍',
                            devoteemoji: '👎'
                        })
                        return message.reply({
                            embeds: [
                                client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 2.')
                            ]
                        })
                    }
                    if (args[1] === '3') {
                        db.collection('guilds').doc(message.guild.id).update({
                            emojipack: 3,
                            upvoteemoji: '⬆',
                            devoteemoji: '⬇'
                        })
                        return message.reply({
                            embeds: [
                                client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 3.')
                            ]
                        })
                    }
                    if (args[1] === '4') {
                        db.collection('guilds').doc(message.guild.id).update({
                            emojipack: 4,
                            upvoteemoji: '904308905532870666',
                            devoteemoji: '904309040891453491'
                        })
                        return message.reply({
                            embeds: [
                                client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 4.')
                            ]
                        })
                    }
                    if (args[1] === '5') {
                        db.collection('guilds').doc(message.guild.id).update({
                            emojipack: 5,
                            upvoteemoji: '904309932449468456',
                            devoteemoji: '904310011239477278'
                        })
                        return message.reply({
                            embeds: [
                                client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 5.')
                            ]
                        })
                    }
                }
            } else if (cmnd === 'prefix') {
                if (!args[1]) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('No Prefix Has Been Provided!')
                        ]
                    })
                }
                let newprefix = args[1].toLowerCase()
                if (newprefix.length > 5) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('Prefix should not be More Than 5 Letters!')
                        ]
                    })
                }
                db.collection('guilds').doc(message.guild.id).update({
                    prefix: newprefix
                })
                    .then(() => {
                        return message.reply({
                            embeds: [
                                client.successembed.setDescription('Successfully Updated The Prefix!')
                            ]
                        })
                    })
            } else if (cmnd == 'embedcolor') {
                function checkcolor(hex) {
                    var re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                    return re.test(hex)
                }
                if (!args[1]) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('No HexCode Has Been Provided!')
                        ]
                    })
                }
                const check = checkcolor(args[1])
                if(check === true) {
                    db.collection('guilds').doc(message.guild.id).update({
                        suggestioncolor: args[1]
                    })
                    return message.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Updated The Embed Color.')
                        ]
                    })
                } else {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('Invalid Hex Code! Having Troubles? Get Your Hex Code at https://silvabot.in.net/hexcode.')
                        ]
                    })
                }
            } else if(cmnd == 'suggestionlimit') {
                if (!args[1]) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('No Limit Has Been Provided!')
                        ]
                    })
                }
                if(args[1].toLowerCase() == 'disable') {
                    db.collection('guilds').doc(message.guild.id).update({
                        suggestionlength: firebase.firestore.FieldValue.delete(),
                        suggestionslice: firebase.firestore.FieldValue.delete(),
                        warn: firebase.firestore.FieldValue.delete()
                    })
                    return message.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Disabled Suggestion Limits!')
                        ]
                    })
                } 
                if (!args[2]) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('No Punishment Has Been Provided!')
                        ]
                    })
                }
                if(isNaN(args[1])) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('Invalid Limit!')
                        ]
                    })
                }
                const punishes = ['cut','warn']
                if(!punishes.includes(args[2].toLowerCase())) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription(`Invalid Punishment!\nAvailable Punishments: ${punishes.join(" , ")}`)
                        ]
                    }) 
                }
                if(args[2].toLowerCase() == 'cut') {
                    db.collection('guilds').doc(message.guild.id).update({
                        suggestionlength: args[1],
                        suggestionslice: true,
                        warn: false
                    })
                    return message.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Updated SuggestionLimits.')
                        ]
                    })
                } else if(args[2].toLowerCase() == 'warn') {
                    db.collection('guilds').doc(message.guild.id).update({
                        suggestionlength: args[1],
                        suggestionslice: false,
                        warn: true
                    })
                    return message.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Updated SuggestionLimits.')
                        ]
                    })
                }
            } else if(cmnd == 'dmlogs') {
                if(!args[1]) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('No Option Has Been Provided!')
                        ]
                    })
                }
                if(args[1].toLowerCase() == 'on') {
                    db.collection('guilds').doc(message.guild.id).update({
                        dmlogs: true
                    })
                    return message.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Updated DM Logs.')
                        ]
                    })
                } else if(args[1].toLowerCase() == 'off') {
                    db.collection('guilds').doc(message.guild.id).update({
                        dmlogs: false
                    })
                    return message.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Updated DM Logs.')
                        ]
                    })
                }
            } else if(cmnd == 'lock') {
                db.collection('guilds').doc(message.guild.id).get().then(function (doc) {
                    if(doc.exists) {
                        let data = doc.data()
                        if(data.noresponses === true) {
                            db.collection('guilds').doc(message.guild.id).update({
                                noresponses: false
                            })
                            return message.reply({embeds:[client.successembed.setDescription('Successfully Removed Suggestions Lock.')]})
                        } else {
                            db.collection('guilds').doc(message.guild.id).update({
                                noresponses: true
                            })
                            return message.reply({embeds:[client.successembed.setDescription('Successfully Enabled Suggestions Lock.')]})
                        }
                    }
                })
            } else if(cmnd == 'channel') {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
                if(!channel) {
                    return message.reply({embeds:[client.errorembed.setDescription('No Channel or Invalid Channel Has Been Provided!')]})
                } else {
                    db.collection('guilds').doc(message.guild.id).update({
                        suggestchannel: channel.id
                    })
                    return message.reply({embeds:[client.successembed.setDescription('Successfully Set The Suggestion Channel For Guild!')]})
                }
            }
        }
    }
}