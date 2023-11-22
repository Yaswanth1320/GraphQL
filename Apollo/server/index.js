const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');
const {default: axios} = require('axios');


async function startserver(){
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Todo{
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }

            type User{
                id: ID!
                name: String!
                email: String!
                phone: String!
                website: String!
            }

            type Query{
                todos:[Todo]!
                users:[User]!
                getUser(id:ID!): User
            }
        `,
        resolvers:{
            Todo:{
                user: async(todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data
            },
            Query:{
                todos: async() => 
                (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,

                users: async() => 
                (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

                getUser: async(_,{id}) => 
                (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            }
        }
    })
    await server.start()

    app.use(bodyParser.json())
    app.use(cors());

    app.use('/graphql', expressMiddleware(server));
    app.listen(4000, () =>{
        console.log("Server started at port 4000")
    })
}

startserver()
