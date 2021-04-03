const neo4j = require('../plugins/neo4j');
const makeQuery = require('../plugins/makeQuery');

const replies = [
	'Your links are being stored somewhere and I won\'t tell you where.',
	'Thank you for adding this useful information.',
	'Now your are free from worying, where do I store my chrome tabs',
];

module.exports = async (msg, args) => {
	const msgAuthor = msg.author;
	const msgContent = msg.content.substr(6, msg.content.length);
	if (!msgContent.includes('https' || 'http')) return;
	let uri = '';
	args.forEach((element) => {
		if (element.includes('https' || 'http')) {
			uri = element;
		}
	});
	const node = {
		username: msgAuthor.username,
		discriminator: msgAuthor.discriminator,
		message: msgContent,
		uri: uri,
	};
	console.log(node);
	const generatedQuery = makeQuery(node);
	neo4j(generatedQuery);
	await msg.channel.send(replies[Math.floor(Math.random() * 3)]);
};
