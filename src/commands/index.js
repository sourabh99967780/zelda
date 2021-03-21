const link = require('./link');
const photu = require('./photu');

const commands = {
	link,
	'photu': photu,
};

module.exports = (msg) => {
	const args = msg.content.split(' ');
	if (args[0].charAt(0) !== '!') return;
	const command = args.shift().substr(1);
	if (Object.keys(commands).includes(command)) {
		commands[command](msg, args);
	}
};