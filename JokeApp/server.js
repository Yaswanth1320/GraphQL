import { ApolloServer} from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import mongoose from "mongoose";
import { JWT_SECERT, MONGO_URL } from "./config.js";
import jwt from "jsonwebtoken";

mongoose.connect(MONGO_URL,{})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on("error", (error)=>{
    console.log("Error occured",error)
})

import './models/user.js';
import './models/Quotes.js';
import { resolvers } from "./resolvers.js";


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({req}) =>{
        const {authorization} = req.headers.authorization || "";
        if(authorization){
            const {userId} = jwt.verify(authorization,JWT_SECERT)
            return {userId}
        }
    }
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server ready at port ", 4000)