const saveToNeo4j = require('../plugins/neo4j');
const filter = require('./filter.json');

/*
	SAMPLE DATA:
		const user = {
		  username: state.userInfo.username,
		  discriminator: state.userInfo.discriminator,
		};

		const relation = {
		  verb: state.verb,
		  timeStamp: {
			machineReadable: currentDate,
			humanReadable: moment(currentDate).format('MMMM Do YYYY, h:mm:ss a'),
		  },
		};

		const value = {
		  "@type": typeOfEntity,
		  "uid": UID,
		  "properties": {
			  ...
		  }
		};

		const data = {
		  user,
		  relation,
		  value
		};
*/
function genericEvent(action_type, data, dataSource) {

	if (!filter.blacklist[action_type]) {
		console.log(`${action_type}: Saving to Neo4j`);
		const query = createCYPHERquery(action_type, data, dataSource);
		saveToNeo4j(query, filter.whitelist[action_type] ? 'prod' : 'dev');
	}

}

function createCYPHERquery(action_type, data, dataSource) {
	const toAppend = Object.keys(data.value.properties)
		.filter((eachProp) => typeof data.value.properties[eachProp] !== 'object' && eachProp !== 'id')
		// eslint-disable-next-line arrow-body-style
		.map((eachProp) => {
			return `SET b.${eachProp} = ${JSON.stringify(data.value.properties[eachProp])}`;
		});
	const query = `
        MERGE (a:User {username: "${data.user.username}", discriminator: "${data.user.discriminator}"})
        SET a.dataSource = "${dataSource}"
        MERGE (b:${data.value['@type']} {uid: "${data.value.uid}"})
        SET b.dataSource= "${dataSource}"
        MERGE (a)-[:${action_type} {unixEventTriggeredAt: ${data.timeStamp.machineReadable}, regularTriggeredAt: "${data.timeStamp.humanReadable}"}]->(b)
        SET b.dataSource = "${dataSource}"
        ${toAppend};"`;
	return query;
}

module.exports = {
	genericEvent,
};