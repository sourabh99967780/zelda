const axios = require('axios');

module.exports = (msg, args) => {
	// const msgAuthor = msg.author;
	// const msgContent = msg.content.substr(6, msg.content.length);
	if (args.length) {
		let searchTerm = 'dog';
		const count = 1;
		searchTerm = args[0];
		axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=${searchTerm}&count=${count}`)
			.then(res => {
				const resObj = res.data;
				console.log(res.data.urls.regular);
				// msg.channel.send(`You may like this picture, ${res.data.urls.regular}`);
			});
	}
};