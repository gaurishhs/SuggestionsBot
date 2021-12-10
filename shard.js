const { ShardingManager } = require('discord.js');
const token = require('./config').token

const manager = new ShardingManager('./index.js', { totalShards: 4, token: token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();