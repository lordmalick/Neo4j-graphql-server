const neo4j = require('neo4j-driver');
require('dotenv').config({path:"./config/.env"});
const config = {
    "neo4j":{
         "uri":process.env.NEO4J_URI,
         "username":process.env.NEO4J_USERNAME,
         "pwd":process.env.NEO4J_PASSWORD
    }
};

//const driver = neo4j.driver(uri, neo4j.auth.basic(username, pwd));
//neo4j.auth.basic('neo4j', pwd, { encrypted: 'ENCRYPTION_ON' });
const driver = neo4j.driver(
        config.neo4j.uri,
        neo4j.auth.basic(config.neo4j.username, config.neo4j.pwd),
        { disableLosslessIntegers: true }
      );
console.log("Connected to Neo4j auradb instance ");   
exports.driver = driver;