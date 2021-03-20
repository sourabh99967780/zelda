const neo4j = require('../plugins/neo4j');
const makeQuery = require('../plugins/makeQuery');

const replies = [
	'Your links are being stored somewhere and I won\'t tell you where.',
	'Thank you for adding this useful information.',
	'Now your are free from worying, where do store my chrome tabs'
]

module.exports = async (msg, args) => {
	makeQuery('Random Data');
	const msgAuthor = msg.author;
	const msgContent = msg.content.substr(6, msg.content.length);
	if (!msgContent.includes('https' || 'http')) return;
	let url = '';
	args.forEach(element => {
		if (element.includes('https' || 'http')) {
			url = element;
		}
	});
	const node = {
		'id': Math.random(10),
		'user': msgAuthor.username,
		'userId': msgAuthor.id,
		'discriminator': msgAuthor.discriminator,
		'message': msgContent,
		'url': url
	};
	console.log(node);
	await msg.channel.send(replies[Math.floor(Math.random() * (3))]);
};