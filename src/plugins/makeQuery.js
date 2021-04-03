module.exports = (data) => {
	const { username, discriminator, message, uri } = data;
	//   const query = `MERGE (:User{username: "${username}", discriminator: "${discriminator}"})-[:VISITED]->(:Link{message: "${message}", uri: "${uri}"});`;
	const query = `MERGE (a:User{username: "${username}", discriminator: "${discriminator}"})
  MERGE (b:Link{uri: "${uri}"})
  MERGE (a)-[:VISITED]->(b)
  SET b.message = "${message}";`;
	console.log(query);
	return query;
};
