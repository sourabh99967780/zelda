const neo4j = require('neo4j-driver');
require('dotenv').config();

module.exports = async (query) => {
	// Connect neo4j driver
	const driver = neo4j.driver(
		process.env.NEO4J_URI,
		neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
	);
	const session = driver.session();
	try {
		await session.writeTransaction(tx =>
			tx.run(query),
		);
		console.log('Query Ran Successfully');
		// const singleRecord = result.records[0]
	}
	finally {
		await session.close();
	}

	// on application exit:
	await driver.close();
};