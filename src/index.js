const discordjs = require('discord.js');
const commandHandler = require('./commands');
require('dotenv').config();

const client = new discordjs.Client();

client.once('ready', () => {
	console.log('Ready');
});

client.on('message', commandHandler);

client.login(process.env.BOT_TOKEN);