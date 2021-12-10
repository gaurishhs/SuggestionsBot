const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const db = require('../firebase')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('approve')
    .setDescription('Approve a Suggestion')
    .addStringOption(option => option.setName('refid').setDescription('Enter RefID').setRequired(true)),
    async execute(interaction, client) {
        const string = interaction.options.getString('refid');
        db.collection('guilds').doc(interaction.guild.id).get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data();
                if (!data.staffroles) {
                    return interaction.reply({
                        embeds: [
                            client.errorembed.setDescription('This Guild Has No Staff Roles.')
                        ]
                    })
                } else {
                    function CheckRoles(arr1, arr2) {
                        return arr1.some(item => arr2.includes(item))
                    }
                    const check = CheckRoles(interaction.member._roles, data.staffroles)
                    if (check) {
                            db.collection('guilds').doc(interaction.guild.id).collection('suggestions').doc(string).get().then(async function (doc1) {
                                if (doc1.exists) {
                                    let data1 = doc1.data();
                                    if(data1.status === 'approved' || data1.status === 'denied') {
                                        return interaction.reply({
                                            embeds: [
                                                client.errorembed.setDescription('Suggestion is Already Approved/Denied!')
                                            ]
                                        })
                                    }
                                    db.collection('guilds').doc(interaction.guild.id).collection('suggestions').doc(string).update({
                                        status: 'approved'
                                    })
                                    const msg = await interaction.guild.channels.cache.get(data.suggestchannel).messages.fetch(data1.messageId).then(async function (msg) {
                                        const editeembed = new Discord.MessageEmbed()
                                            .setColor('#0FFF00')
                                            .setFooter(`UserId: ${data1.postedbyid} • ReferenceID: ${doc1.id}`)
                                            .setTimestamp()
                                            .addField('__**Suggestion By:**__', `${data1.postedbyusertag}`)
                                            .addField("__**Suggestion:**__", `\`${data1.suggestion}\``)
                                            .addField("__**Status:**__", " ✅ Approved")
                                        await msg.edit({
                                            embeds: [editeembed]
                                        })
                                            .then(async () => {
                                                await msg.reactions.removeAll();
                                                if(data.dmlogs === true) {
                                                    const user = interaction.guild.members.cache.get(data1.postedbyid)
                                                    let userembed = new Discord.MessageEmbed()
                                                    .setTitle('Suggestion Approved!')
                                                    .setColor('#0FFF00')
                                                    .setDescription(`Hey There ${user}, Your Suggestion in ${interaction.guild.name} With RefID: \`${doc1.id}\` has Been Approved! Congratulations!`)
                                                    user.send({embeds:[userembed]})
                                                }
                                                interaction.reply({
                                                    embeds: [
                                                        client.successembed.setDescription('Successfully Approved Suggestion!')
                                                    ]
                                                })
                                            })
                                    })
                                } else {
                                    return interaction.reply({ embeds: [client.errorembed.setDescription('No Such Suggestion Exists!')] })
                                }
                            })
                    } else {
                        return interaction.reply({
                            embeds: [
                                client.errorembed.setDescription('You arent a Staff Of This Guild!')
                            ]
                        })
                    }
                }
            }
        })
    }
}