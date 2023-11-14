import { ApolloServer} from "@apollo/server";
import { ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import { startStandaloneServer } from "@apollo/server/standalone";
import {typeDefs,resolvers} from './parameters.js'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server ready at port ", 4000)