const neo4j = require('./plugins/neo4j');
const makeQuery = require('./plugins/makeQuery');

module.exports = async (msg, args) => {
	makeQuery('Random Data');
	await msg.channel.send('Your links are being stored somewhere and I won\'t tell you where.');
};