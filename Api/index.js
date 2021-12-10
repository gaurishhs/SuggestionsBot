const express = require('express');
const app = express()
const client = require('../index');

app.get('/api/checkuser', async(req, res) => {
    var guildid = req.params;
    var userid = req.params
    const guild = client.guilds.cache.get(guildid)
    const user = guild.members.cache.get(userid)
    if(user) {
        return res.send(true)
    } else {
        return res.send(false)
    }
})

app.listen('6969', () => {
    console.log('Api Server is Ready.')
})
