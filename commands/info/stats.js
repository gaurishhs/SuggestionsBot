const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'stats',
    run: async(client, message, args) => {
        const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        const embed = new Discord.MessageEmbed()
        .setTitle('Stats!')
        .setColor('ORANGE')
        .setDescription(`
            \`\`\`
Websocket Latency: ${Date.now() - message.createdTimestamp}
API Latency: ${Math.round(client.ws.ping)}ms!
Uptime: ${ms(client.uptime)}
Rust Version: 1.56.1
Bot Version: 1.0.6
Guild Count: ${totalGuilds}
User Count: ${totalMembers}
Clusters: 1
Shards: 4
            \`\`\`
        `)
        return message.reply({
            embeds: [embed]
        })
    })
    }
}