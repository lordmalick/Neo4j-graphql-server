require('dotenv').config({path:"./config/.env"});
const express = require('express');
const { graphqlHTTP } = require ('express-graphql'); 
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const RootQuery = require('./graphql/schema/index'); 
const RootMutation = require('./graphql/mutation/index');
const app = express();
const PORT = process.env.PORT || 4000;
  app.use('/graphql',graphqlHTTP({
    schema:new GraphQLSchema({query : RootQuery, mutation : RootMutation}),
    graphiql: true
  }));
  app.listen(PORT, () => console.log('Server is running on port : '+ PORT)); 