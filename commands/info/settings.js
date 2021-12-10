const Discord = require('discord.js');

module.exports = {
    name: 'settings',
    run: async(client, message, args, db) => {
        db.collection('guilds').doc(message.guild.id).get().then(function (doc) {
            if(doc.exists) {
                let data = doc.data();
                let staffroles = []
                if(data.staffroles) {
                   	data.staffroles.forEach(role => {
                        staffroles.push(`<@&${role}>`)
                    })
                } else {
                    staffroles.push('❌')
                }
                let embed = new Discord.MessageEmbed()
                .setTitle(`Configuration For ${message.guild.name}`)
                .setColor('DARK_VIVID_PINK')
                .addFields(
                    {
                        name: `Emoji Pack`,
                        value: `${data.emojipack}`,
                        inline: true
                    },
                    {
                        name: `DM Logs`,
                        value: `${data.dmlogs ? '✅' : '❌' }`,
                        inline: true
                    },
					{
                        name: `Embed Color`,
                        value: `${data.suggestioncolor}`,
                    	inline: true,
                    },
                    {
					name: `Staff Roles`,
                    value: `${staffroles}`
                    }
                )
                return message.reply({embeds:[embed]})
			}
        })
    }
}