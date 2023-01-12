const {GraphQLObjectType,GraphQLString, GraphQLInt,GraphQLID} = require('graphql');
const ClubType = require('../types');
const cypher = require('../../models/cypher');

const updateClub = {
  name:"updateClub",
  type: ClubType,
  args:{id :{type:GraphQLInt},club : {type: GraphQLString}, league : {type: GraphQLString}},
  resolve: async (parent,args) =>{
      const query = `MATCH (n:Club {id :$id}) SET n.club=$club,n.league=$league RETURN n `;
      const updateIdquery ="MATCH (n) set n.id = id (n) return n";
      const params = {
          id : args.id,
          club:args.club,
          league:args.league
      };
      const resultObj = await cypher.executeCypherQuery(query,params);
      console.log(resultObj);
      return {club:args.club,league:args.league}
  }
}
const addClub = {
  name:"addClub",
  type: ClubType,
  args:{club : {type: GraphQLString}, league : {type: GraphQLString}},
  resolve: async (args) =>{
      const query = `CREATE (n:Club {club:$club, league: $league}) RETURN n`;
      //const updateIdquery ="MATCH (n) set n.id = id (n) return n";
     
      // const club = args.club;
      // const league = args.league;
      const params = {
          club:args.club,
          league:args.league
      };
      const resultObj = await cypher.executeCypherQuery(query,params);
      //const updobj = await cypher.updateId(updateIdquery);
      const res = formatResponse(resultObj);
      //const afupd = formatResponse(updobj);
      console.log(res);
      return {club:args.club,league:args.league}
  }
}
const deleteClub = {
  name:"deleteClub",
  type: ClubType,
  args:{club: {type: GraphQLString}},
  resolve: async (args) =>{
      const query = `MATCH (n:Club {club : $club}) DELETE n`;
      const params = {
          club : args.club
      };
      await cypher.executeCypherQuery(query,params);
      return args.club+ " Successfuly Deleted !"
  }
}

const RootMutation = new GraphQLObjectType({
    name : "RootMutation",
    fields : 
    {
        addClub,
        deleteClub,
        updateClub
    }
});
function formatResponse(resultObj) {
    const result = [];
    if (resultObj.records.length > 0) {
      resultObj.records.map(record => {
        result.push(record._fields[0].properties);
      });
    }
    return result;
  }
module.exports=RootMutation;