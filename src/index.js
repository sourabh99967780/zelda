const discordjs = require('discord.js');
const commandHandler = require('./commands');
const logger = require('./logger');
require('dotenv').config();

const client = new discordjs.Client();

client.once('ready', () => {
	logger.log('info', 'The bot is online!')
	console.log('Ready')
});
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));
process.on('uncaughtException', error => logger.log('error', error));

client.on('message', commandHandler);

client.login(process.env.BOT_TOKEN);