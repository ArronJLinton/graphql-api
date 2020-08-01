const _ = require('lodash');
const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema, 
    GraphQLScalarType
} = require('graphql');

const userData = [
    // TODO: Is the default data type for GraphQLID a string?
    {id: '1', name: 'Scarlet', age: 38, city: 'Seattle'},
    {id: '2', name: 'Pearl', age: 23, city: 'Sicily'},
    {id: '3', name: 'Jasmine', age: 28, city: 'Egypt'},
];

const hobbyData =  [
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place.'},
    {id: '2', title: 'Soccer', description: 'It\'s a beautiful game'},
    {id: '3', title: 'Reading', description: 'Knowledge is power.'},
    {id: '4', title: 'Life', description: 'Nothing better than enjoying yourself.'},
    {id: '5', title: 'Music', description: 'The healing force of the world.'}
]

const postData = [
    {id: '1', comment: 'Building a Mind', userId: '1'},
    {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
    {id: '3', comment: 'How to Change the World', userId: '19'},
    {id: '4', comment: 'How to Change the World', userId: '211'},
    {id: '5', comment: 'How to Change the World', userId: '1'}
]

// Create types
const UserType = new GraphQLObjectType({
    // pass in a value for name and description for documentation purposes
    name: 'User',
    description: 'Documentation for user...',
    // fields for the user
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        city: {type: GraphQLString}
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobbies description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
    })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        // establish a connection between root and UserType
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            // parent refers to the user type
            // args refers to the args
            resolve(parent, args) {
                // use lodash to iterate around userData and return the user object associated with the incoming id
                return _.find(userData, {id: args.id})
                // we resolve with data
                // get and return data from a datasource
            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return data for our hobby
                return _.find(hobbyData, {id:args.id})
            }
        },
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return data for our hobby
                return _.find(postData, {id:args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})