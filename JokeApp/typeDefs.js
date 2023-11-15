export const typeDefs = `#graphql
    type Query{
        users: [User]
        user(_id: ID!): User
        quotes:[QuoteWithName]
        iquote(by: ID!): [Quote] 
    }
    type QuoteWithName{
        name: String!
        by: Idname!
    }
    type Idname{
        _id: String!
        firstName: String!
    }
    type User{
        _id: ID!
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
    type Token{
        token: String
    }

    type Mutation{
        addUser(userType:UserInput!): User
        signinUser(userSignin: UserSigninInput!): Token 
        createQuote(name: String!): String
    }
    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password: String!
    }
    input UserSigninInput{
        email:String!
        password: String!
    }
`