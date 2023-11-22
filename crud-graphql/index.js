const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const { startStandaloneServer } = require("@apollo/server/standalone");

const MONGO_URL = "mongodb+srv://yaswanth:yaswanth123@cluster0.eupvchr.mongodb.net/";

mongoose.connect(MONGO_URL,{})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on("error", (error)=>{
    console.log("Error occured",error)
})

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers.js');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = startStandaloneServer(server, {
    listen: { port: 8000 }
})

console.log(`Server ready at port`,8000)