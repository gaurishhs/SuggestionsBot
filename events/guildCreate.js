const client = require('../index');
const db = require('../firebase')

client.on('guildCreate', async(guild) => {
    db.collection('guilds').doc(guild.id).set({
        emojipack: 1,
        noresponses: false,
        dmlogs: true,
        suggestioncolor: '#00FFF0',
        upvoteemoji: '✅',
        devoteemoji: '❌'
    })
})