const axios = require('axios');
const embed = require('../plugins/embed');

module.exports = (msg, args) => {
	const msgAuthor = msg.author;
	// const msgContent = msg.content.substr(6, msg.content.length);

	if (args.length) {
		if (args[0] == 'help') {
			const embedObj = embed.setColor('#0099ff')
				.setTitle('Some title')
				.setURL('https://discord.js.org/')
				.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
				.setDescription('Some description here')
				.setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addField('Inline field title', 'Some value here', true)
				.setImage('https://i.imgur.com/wSTFkRM.png')
				.setTimestamp()
				.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
			msg.channel.send(embedObj);
			return;
		}

		let searchTerm = 'dog';
		let imageType = 'regular';
		const count = 1;
		imageType = args[args.length - 1];
		searchTerm = args.slice(0, args.length - 1).join(' ');
		axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=${searchTerm}&count=${count}`)
			.then(response => response.data)
			.then(data => {
				console.log(data[0].urls.regular);
				const uris = data[0].urls;
				msg.channel.send(`Hey ${msgAuthor}, Your requested image is here. ${uris[imageType]}`);
			});
	}
};