import {users,quotes} from './fakedb.js'
import {randomBytes} from 'crypto'

export const typeDefs = `#graphql
    type Query{
        users: [User]
        user(id: ID!): User
        quotes:[Quote]
        iquote(by: ID!): [Quote] 
    }

    type User{
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        quotes: [Quote!]

    }
    type Quote{
        name: String!
        by: String!
    }

    type Mutation{
        addUser(firstName:String!,lastName:String!,email:String!,password: String!): User
    }
`

export const resolvers = {
    Query: {
       users: () => users,
       user:  (_,args) => users.find((ur) => args.id === ur.id),
       quotes: () => quotes,
       iquote: (_,args) => quotes.filter(quote => quote.by === args.by)
    },
    User: {
        quotes: (ur) => quotes.filter(quote => quote.by === ur.id),
    },
    Mutation: {
        addUser: (_,{firstName,lastName,email,password}) => { 
            const id = randomBytes(5).toString("hex")
            users.push({
                id,
                firstName,
                lastName,
                email,
                password
            })
            return users.find(user => user.id === id)
        }
    }
}

