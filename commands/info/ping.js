const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        client.shard
        .broadcastEval(c => c.ws.ping)
        .then(values => {
            const embed = new Discord.MessageEmbed()
            .setTitle('Ping Successful!')
            .setColor('AQUA')
            .addFields(
                {
                    name: 'Shard 1:',
                    value: `${values[0]}ms`
                },
                {
                    name: 'Shard 2:',
                    value: `${values[1]}ms`
                },
                {
                    name: 'Shard 3:',
                    value: `${values[2]}ms`
                },
                {
                    name: 'Shard 4:',
                    value: `${values[3]}ms`
                }
            )
            return message.reply({embeds:[embed]})
        });
    },
};
