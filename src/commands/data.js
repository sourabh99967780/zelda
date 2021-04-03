/* eslint-disable indent */
const { searched_for } = require('../verb_actions/searchedFor');
const { visited } = require('../verb_actions/visited');
// !data <ACTION_TYPE> <Value> <DataSource>


module.exports = async (msg, args) => {
	console.log(msg);
	console.log(args);
	const action_type = args[0];
	const value = args[1];
	const dataSource = args[2] | 'no_source';
	switch (action_type) {
		case 'SEARCHED_FOR': searched_for(action_type, value, dataSource);
			break;
		case 'VISITED': visited(action_type, value, dataSource);
			break;
	}

};