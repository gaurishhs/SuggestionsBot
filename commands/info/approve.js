const Discord = require('discord.js');

module.exports = {
    name: 'approve',
    run: async (client, message, args, db) => {
        db.collection('guilds').doc(message.guild.id).get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data();
                if (!data.staffroles) {
                    return message.reply({
                        embeds: [
                            client.errorembed.setDescription('This Guild Has No Staff Roles.')
                        ]
                    })
                } else {
                    function findstaffroles(arr1, arr2) {
                        return arr1.some(item => arr2.includes(item))
                    }
                    const check = findstaffroles(message.member._roles, data.staffroles)
                    if (check) {
                        if (!args[0]) {
                            return message.reply({
                                embeds: [
                                    client.errorembed.setDescription('Provide a ReferenceID!')
                                ]
                            })
                        } else {
                            db.collection('guilds').doc(message.guild.id).collection('suggestions').doc(args[0]).get().then(async function (doc1) {
                                if (doc1.exists) {
                                    let data1 = doc1.data();
                                    if(data1.status === 'approved' || data1.status === 'denied') {
                                        return message.reply({
                                            embeds: [
                                                client.errorembed.setDescription('Suggestion is Already Approved/Denied!')
                                            ]
                                        })
                                    }
                                    db.collection('guilds').doc(message.guild.id).collection('suggestions').doc(args[0]).update({
                                        status: 'approved'
                                    })
                                    const msg = await message.guild.channels.cache.get(data.suggestchannel).messages.fetch(data1.messageId).then(async function (msg) {
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
                                                    const user = message.guild.members.cache.get(data1.postedbyid)
                                                    let userembed = new Discord.MessageEmbed()
                                                    .setTitle('Suggestion Approved!')
                                                    .setColor('#0FFF00')
                                                    .setDescription(`Hey There ${user}, Your Suggestion in ${message.guild.name} With RefID: \`${doc1.id}\` has Been Approved! Congratulations!`)
                                                    user.send({embeds:[userembed]})
                                                }
                                                message.reply({
                                                    embeds: [
                                                        client.successembed.setDescription('Successfully Approved Suggestion!')
                                                    ]
                                                })
                                            })
                                    })
                                    //    const embed = msg.embeds[0]

                                } else {
                                    return message.reply({ embeds: [client.errorembed.setDescription('No Such Suggestion Exists!')] })
                                }
                            })
                        }
                    } else {
                        return message.reply({
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