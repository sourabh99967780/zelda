const saveToNeo4j = require('../plugins/neo4j');
const filter = require('./filter.json');

/*
	SAMPLE DATA:
		const user = {
		  username: state.userInfo.username,
		  discriminator: state.userInfo.discriminator,
		};

		const action = {
		  searchEntity: state.wikiWord,
		  result: state.wikiInformation,
		};

		const relation = {
		  verb: state.verb,
		  timeStamp: {
			machineReadable: currentDate,
			humanReadable: moment(currentDate).format('MMMM Do YYYY, h:mm:ss a'),
		  },
		};

		const data = {
		  ...user,
		  ...relation,
		  ...action,
		};
*/
function searched_for(action_type, data, dataSource) {

	if (!filter.blacklist[action_type]) {
		console.log('SEARCHED FOR: Saving to Neo4j');
		const query = createCYPHERquery(action_type, data, dataSource);
		saveToNeo4j(query, filter.whitelist[action_type] ? 'prod' : 'dev');
	}

}

function createCYPHERquery(action_type, data, dataSource) {
	const toAppend = data.result.search
		.map((element, i) => {
			let qS = `MERGE (c${i}: WikiInfo{qid: "${element.id}"}) \n`;
			qS += `MERGE (b) -[:LINKS_TO]-> (c${i})\n`;
			qS += Object.keys(element)
				.filter((eachProp) => typeof element[eachProp] !== 'object' && eachProp !== 'id')
				// eslint-disable-next-line arrow-body-style
				.map((eachProp) => {
					return `SET c${i}.${eachProp} = ${JSON.stringify(element[eachProp])}`;
				})
				.concat(`SET c${i}.dataSource = "${dataSource}"`)
				.join('\n');
			return qS;
		})
		.join('\n');
	// eslint-disable-next-line max-len
	const query = `
        MERGE (a:User {username: "${data.username}", discriminator: "${data.discriminator}"})
        SET a.dataSource = "${dataSource}"
        MERGE (b:Word {word: "${data.searchEntity}"})
        SET b.dataSource= "${dataSource}"
        MERGE (a)-[:${action_type} {unixEventTriggeredAt: ${data.timeStamp.machineReadable}, regularTriggeredAt: "${data.timeStamp.humanReadable}"}]->(b)
        SET b.dataSource = "${dataSource}"
        SET b.word = "${data.searchEntity}"\n${toAppend};`;
	return query;
}

module.exports = {
	searched_for,
};