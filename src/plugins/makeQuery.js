module.exports = (data) => {
	const { userId, username, discriminator, message, uri } = data;
	const query = `MERGE (:User{userId: ${userId}, username: "${username}", discriminator: "${discriminator}"})-[:VISITED]->(:Link{message: "${message}", uri: "${uri}"});`;
	return query;
};