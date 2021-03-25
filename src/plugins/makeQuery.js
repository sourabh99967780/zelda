function createVistedLinkQuery(subject, link) {
	const { username, discriminator, message, uri } = {...subject, ...link};
	//   const query = `MERGE (:User{username: "${username}", discriminator: "${discriminator}"})-[:VISITED]->(:Link{message: "${message}", uri: "${uri}"});`;
	const query = `MERGE (a:User{username: "${username}", discriminator: "${discriminator}"})
	MERGE (b:Link{uri: "${uri}"})
	MERGE (a)-[:VISITED]->(b)
	SET b.message = "${message}";`;
	console.log(query);
	return query;
}

function actionDoneOnPageQuery(subject, action) {
	const { username, discriminator, action, details} = {...subject, ...link};
	//   const query = `MERGE (:User{username: "${username}", discriminator: "${discriminator}"})-[:VISITED]->(:Link{message: "${message}", uri: "${uri}"});`;
	const query = `MERGE (a:User{username: "${username}", discriminator: "${discriminator}"})
	MERGE (b:EVENT{uri: "${uri}"})
	MERGE (a)-[:ACTION]->(b)
	SET b.details = "${details}";`;
	console.log(query);
	return query;
}

module.exports = {
	createVistedLinkQuery, 
	actionDoneOnPageQuery
}