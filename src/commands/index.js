const link = require('./link');
const photo = require('./photo');
const data = require('./data');

const commands = {
	link,
	'photo': photo,
	data,
};

module.exports = (msg) => {
	const args = msg.content.split(' ');
	if (args[0].charAt(0) !== '!') return;
	const command = args.shift().substr(1);
	if (Object.keys(commands).includes(command)) {
		commands[command](msg, args);
	}
};