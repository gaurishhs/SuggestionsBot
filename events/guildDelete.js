const client = require('../index');
const db = require('../firebase')

client.on('guildDelete', async(guild) => {
    db.collection('guilds').doc(guild.id).delete()
})