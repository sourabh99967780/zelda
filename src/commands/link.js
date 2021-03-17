const neo4j = require('../plugins/neo4j');
const makeQuery = require('../plugins/makeQuery');

module.exports = async (msg, args) => {
	makeQuery('Random Data');
	const msgAuthor = msg.author;
	const msgContent = msg.content.substr(6, msg.content.length);
	if (!msgContent.includes('https' || 'http')) return;
	console.log(args);
	const node = {
		'id': Math.random(10),
		'user': msgAuthor.username,
		'userId': msgAuthor.id,
		'discriminator': msgAuthor.discriminator,
		'message': msgContent,
	};
	console.log(node);
	await msg.channel.send('Your links are being stored somewhere and I won\'t tell you where.');
};