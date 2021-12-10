const client = require("../index");
const db = require('../firebase');

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
        try {
        let prefix;
        await db.collection("guilds").doc(message.guild.id).get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data()
                if(data.prefix) {
                    prefix = data.prefix
                } else {
                    prefix = '.'
                }
            } 
        })
        if (message.content.startsWith(prefix)) {
            const [cmd, ...args] = message.content
                .slice(prefix.length)
                .trim()
                .split(" ");
    
            const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
            if (!command) return;
            await command.run(client, message, args, db, prefix);
        }
    } catch(e) {
        console.log(e)
    }   
});
