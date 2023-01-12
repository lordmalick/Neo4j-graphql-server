const {GraphQLString,GraphQLInt,GraphQLObjectType} = require('graphql');

const PlayerType = new GraphQLObjectType({
    name:"PlayerType",
    fields : () => ({
        nom:{type : GraphQLString},
        prenom:{type : GraphQLString},
        age:{type : GraphQLInt},
        club:{type : GraphQLString}
    })
});
module.exports = PlayerType;