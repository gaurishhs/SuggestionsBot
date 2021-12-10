const { Client, Collection } = require("discord.js");
const fs = require('fs');


const client = new Client({
    intents: 32767,
	allowedMentions: {
		repliedUser: false
	},
	presence: {
		status: 'dnd',
		activities: [
			{
				name: '/help',
				type: 'LISTENING'
			}
		]
	}
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.js");
client.progressbar = require('./utils/progressbar')
client.errorembed = require('./utils/EmbedManager').newErrorEmbed
client.successembed = require('./utils/EmbedManager').newSuccessEmbed
client.db = require('./firebase')
const commandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./SlashCommands/${file}`);
	client.slashCommands.set(command.data.name, command);
}

require("./handler")(client);
// require('./Api')

client.login(client.config.token);
