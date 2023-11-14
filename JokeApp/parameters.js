import {users,quotes} from './fakedb.js'

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
        quotes: [Quote!]

    }

    type Quote{
        name: String!
        by: String!
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
    }
}

