const ClubType = require('../types');
const PlayerType = require('../playertype');
const {GraphQLObjectType,GraphQLList,GraphQLString} = require('graphql');
const cypher = require('../../models/cypher');
const query = `MATCH (n:Club) RETURN n`;
const allPlayerQuery = 'MATCH (n:Player)-[r:PLAY_FOR]->(c:Club) return n,c.club';

const allplayersAndClub= {
  name : "Player",
  type : GraphQLList(PlayerType),
  resolve : async() =>
  {
    const allplayer = [];
    const rawResult = await cypher.findAll(allPlayerQuery); 
    const res = formatResponse(rawResult);
    
    res.map(item => {
      allplayer.push(item)
    });
    const club = [];

    rawResult.records.map(record => {
      club.push(record._fields[1]);
  
    });
    for(let i = 0; i < allplayer.length; i++){
      allplayer[i]["club"]=club[i];
      console.log(allplayer[i]);
    }
    console.log(allplayer);

    return allplayer;
  }
}
const findPlayer={
  
}
const clubs = {
  name :"Club",
  type: GraphQLList(ClubType),
  resolve : async () => 
  {
    const res = await cypher.findAll(query);
    const resfmt = formatResponse(res);
    return resfmt;
     
  }
}
const findClub = {
  name:"findClub",
  type: ClubType,
  args:{club : {type: GraphQLString}},
  resolve: async (parent,args) =>{
      const query = `MATCH (n:Club {club : $club}) RETURN n`;
      const params = {
          club : args.club
      };  
      const rawObj = await cypher.executeCypherQuery(query,params);
      const formatObj = formatResponse(rawObj);
      return {club:formatObj[0].club,league:formatObj[0].league}
  }
}

const RootQuery = new GraphQLObjectType({
      name: 'RootQuery',
      fields: 
      {
        allplayersAndClub,
        clubs,
        findClub
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
  module.exports=RootQuery;