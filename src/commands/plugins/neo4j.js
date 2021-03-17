const neo4j = require('neo4j-driver');
require('dotenv').config();

// Connect neo4j driver
const driver = neo4j.driver(
	process.env.NEO4J_URI,
	neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
);

const session = driver.session({
	database: 'neo4j',
});

driver.close();

module.exports = (query) => {
	session.run(query)
		.subscribe({
			onKeys: keys => {
				console.log(keys);
			},
			onCompleted: () => {
				session.close();
			},
			onError: (error) => {
				console.log(error);
			},
		});
};