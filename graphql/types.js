const {GraphQLString,GraphQLID,GraphQLObjectType} = require('graphql');

const ClubType = new GraphQLObjectType({
    name:"ClubType",
    fields : () => ({
        club:{type : GraphQLString},
        league:{type : GraphQLString}
    })
});
const PlayerType = new GraphQLObjectType({
    name:"PlayerType",
    fields : () => ({
        nom:{type : GraphQLString},
        prenom:{type : GraphQLString}
    })
});
module.exports = ClubType,PlayerType;