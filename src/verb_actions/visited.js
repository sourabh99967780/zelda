const saveToNeo4j = require('../plugins/neo4j');
const filter = require('./filter.json');


/*
	SAMPLE DATA:
		data["username"] = result.user_detail.username
		data["discriminator"] = result.user_detail.discriminator
		data["email"] = result.user_detail.email
		data["title"] = document.title
		data["url"] = window.location.href
		data["time"] = current_time
*/

function visited(action_type, data, dataSource) {

	if (!filter.blacklist[action_type]) {
		console.log('SEARCHED FOR: Saving to Neo4j');
		const query = createCYPHERquery(action_type, data, dataSource);
		saveToNeo4j(query, filter.whitelist[action_type] ? 'prod' : 'dev');
	}

}

function createCYPHERquery(action_type, data, dataSource) {
	const query = `
		MERGE (a:User{username: '${data.username}', discriminator: '${data.discriminator}', email: '${data.email}'})
		MERGE (b:Link{uri: '${data.url}'}) 
		MERGE (a)-[l:${action_type} {timestamps: '${data.time}'}]->(b)
		SET a.dataSource = "${dataSource}"
		SET b.message = '${data.title}';
		SET b.dataSource = "${dataSource}"
		SET l.dataSource = "${dataSource}"
		`;
	return query;
}

module.exports = {
	visited,
};