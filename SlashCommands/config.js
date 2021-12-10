const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const db = require('../firebase')
const firebase = require('firebase/app')
require('firebase/firestore')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configure The Settings For Guild')
    .addSubcommand(subcommand =>
		subcommand
			.setName('staffroles')
			.setDescription('Configure The Staff Roles For Server')
            .addRoleOption(option => option.setName('role').setDescription('Select The role For StaffRoles').setRequired(true))
            )
    .addSubcommand(subcommand =>
		subcommand
			.setName('emojis')
			.setDescription('Configure The Emojis For Server')
            .addNumberOption(option => option.setName('emojipack').setDescription('Enter Emoji Pack Number'))
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('prefix')
			.setDescription('Configure The Prefix For Server')
            .addStringOption(option => option.setName('prefix').setDescription('Enter New Prefix').setRequired(true))

    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('embedcolor')
			.setDescription('Configure The Embed Color For Server')
            .addStringOption(option => option.setName('embedcolor').setDescription('Enter The EmbedColor').setRequired(true))
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('suggestionlimit')
			.setDescription('Configure The SuggestionLimits For Server')
            .addNumberOption(option => option.setName('limit').setDescription('Enter The Limit').setRequired(true))
            .addStringOption(option => option.setName('punishment').setDescription('Choose The Punishment').addChoice('warn','warn_user').addChoice('cut','cut_text').setRequired(true))
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('dmlogs')
			.setDescription('Configure The DmLogs For Server')
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('lock')
			.setDescription('Configure The SuggestionLock For Server')
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('channel')
			.setDescription('Configure The Suggestion Channel For Server')
            .addChannelOption(option => option.setName('channel').setDescription('Select The Suggestions channel.').setRequired(true))
    ),
    async execute(interaction, client) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({embeds:[client.errorembed.setDescription('You\'re Missing Permissions To Execute This Command.')]})
        }
        //Staff Roles
        if(interaction.options.getSubcommand() == 'staffroles') {
            const role = interaction.options.getRole('role')
            db.collection('guilds').doc(interaction.guild.id).get().then(function (doc) {
                if(doc.exists) {
                    let data = doc.data();
                    if(data.staffroles.includes(role.id)) {
                        db.collection('guilds').doc(interaction.guild.id).update({
                            staffroles: firebase.firestore.FieldValue.arrayRemove(role.id)
                        })
                        return interaction.reply({
                            embeds: [client.successembed.setDescription('Successfully Removed Role From Staff Roles.')],
                            ephemeral: true
                        })
                    } else {
                        db.collection('guilds').doc(interaction.guild.id).update({
                            staffroles: firebase.firestore.FieldValue.arrayUnion(role.id)
                        })
                        return interaction.reply({
                            embeds: [client.successembed.setDescription('Successfully Added Role To Staff Roles.')],
                            ephemeral: true
                        })
                    }
                }
            })
        }
        if(interaction.options.getSubcommand() == 'emojis') {
            interaction.deferReply()
           const packno = interaction.options.getNumber('emojipack')
           if(!packno) {
            db.collection('guilds').doc(interaction.guild.id).get().then(function (doc) {
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
                    return interaction.followUp({ embeds: [emojiembed] })
                }
            })
           } else {
            if (packno === 1) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    emojipack: 1,
                    upvoteemoji: '✅',
                    devoteemoji: '❌'
                })
                return interaction.followUp({
                    embeds: [
                        client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 1.')
                    ]
                })
            }
            if (packno === 2) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    emojipack: 2,
                    upvoteemoji: '👍',
                    devoteemoji: '👎'
                })
                return interaction.followUp({
                    embeds: [
                        client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 2.')
                    ]
                })
            }
            if (packno === 3) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    emojipack: 3,
                    upvoteemoji: '⬆',
                    devoteemoji: '⬇'
                })
                return interaction.followUp({
                    embeds: [
                        client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 3.')
                    ]
                })
            }
            if (packno === 4) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    emojipack: 4,
                    upvoteemoji: '904308905532870666',
                    devoteemoji: '904309040891453491'
                })
                return interaction.followUp({
                    embeds: [
                        client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 4.')
                    ]
                })
            }
            if (packno === 5) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    emojipack: 5,
                    upvoteemoji: '904309932449468456',
                    devoteemoji: '904310011239477278'
                })
                return interaction.followUp({
                    embeds: [
                        client.successembed.setDescription('Successfully Set The Emoji Pack To Pack 5.')
                    ]
                })
            }
            return interaction.followUp('Invalid Option.')
           }
        }

        if(interaction.options.getSubcommand() == 'prefix') {
            const string = interaction.options.getString('prefix')
            if(string.length > 5) {
                return interaction.reply({
                    embeds: [
                        client.errorembed.setDescription('Prefix should not be More Than 5 Letters!')
                    ]
                })
            }
            db.collection('guilds').doc(interaction.guild.id).update({
                prefix: string
            })
                .then(() => {
                    return interaction.reply({
                        embeds: [
                            client.successembed.setDescription('Successfully Updated The Prefix!')
                        ]
                    })
                })
        }
        if(interaction.options.getSubcommand() == 'embedcolor') {
            let hexcode = interaction.options.getString('embedcolor')
            function checkcolor(hex) {
                var re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return re.test(hex)
            }
            const check = checkcolor(hexcode)
            if(check === true) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    suggestioncolor: hexcode
                })
                return interaction.reply({
                    embeds: [
                        client.successembed.setDescription('Successfully Updated The Embed Color.')
                    ]
                })
            } else {
                return interaction.reply({
                    embeds: [
                        client.errorembed.setDescription('Invalid Hex Code! Having Troubles? Get Your Hex Code at https://silvabot.in.net/hexcode.')
                    ]
                })
            }
        }
        if(interaction.options.getSubcommand() == 'suggestionlimit') {
            const limit = interaction.options.getNumber('limit')
            let warn = false
            let slice = false
            if(interaction.options._hoistedOptions[1].value == 'warn_user') {
                warn = true
            }
            if(interaction.options._hoistedOptions[1].value == 'cut_text') {
                slice = true
            }
            if(warn === true) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    suggestionlength: limit,
                    warn: true,
                    suggestionslice: false
                })
                return interaction.reply({embeds:[client.successembed.setDescription('Successfully Configured SuggestionLimits.')]})
            } else if(slice === true) {
                db.collection('guilds').doc(interaction.guild.id).update({
                    suggestionlength: limit,
                    warn: false,
                    suggestionslice: true
                })
                return interaction.reply({embeds:[client.successembed.setDescription('Successfully Configured SuggestionLimits.')]})
            }
        }
        if(interaction.options.getSubcommand() == 'dmlogs') {
            db.collection('guilds').doc(interaction.guild.id).get().then(function (doc) {
                if(doc.exists) {
                    let data = doc.data();
                    if(data.dmlogs === true) {
                        db.collection('guilds').doc(interaction.guild.id).update({
                            dmlogs: false
                        })
                        return interaction.reply({embeds:[client.successembed.setDescription('Successfully Disabled DMLogs!')]})
                    } else if(data.dmlogs === false) {
                        db.collection('guilds').doc(interaction.guild.id).update({
                            dmlogs: true
                        })
                        return interaction.reply({embeds:[client.successembed.setDescription('Successfully Enabled DMLogs!')]})
                    }
                }
            })
        }
        if(interaction.options.getSubcommand() == 'lock') {
            db.collection('guilds').doc(interaction.guild.id).get().then(function (doc) {
                if(doc.exists) {
                    let data = doc.data();
                    if(data.noresponses === true) {
                        db.collection('guilds').doc(interaction.guild.id).update({
                            noresponses: false
                        })
                        return interaction.reply({embeds:[client.successembed.setDescription('Successfully Disabled SuggestionLock!')]})
                    } else if(data.noresponses === false) {
                        db.collection('guilds').doc(interaction.guild.id).update({
                            noresponses: true
                        })
                        return interaction.reply({embeds:[client.successembed.setDescription('Successfully Enabled SuggestionLock!')]})
                    }
                }
            })
        }
        if(interaction.options.getSubcommand() == 'channel') {
            const channel = interaction.options.getChannel('channel')
            db.collection('guilds').doc(interaction.guild.id).update({
                suggestchannel: channel.id
            })
            return interaction.reply({embeds:[client.successembed.setDescription('Successfully Set The Suggestion Channel For Guild!')]})
        }
    }
}