

module.exports = `#graphql

    type User{
        id: ID
        username: String!
        email: String!
        token: String
        createdAt: String
    }
    type Message{
        uuid: String!
        content: String!
        from: String!
        to: String!
        createdAt: String
    }
    type Query {
        getUsers: [User]!
        users: [User]!
        login(email: String!,password: String!): User!
        deleteUser(id: ID!): User
        getMessages(from:String!): [Message]!
    }
    type Mutation {
        register(
            username: String!,
            email: String!
            password: String!,
            confirmpassword: String!
            ): User!
        sendMessage(to:String!, content:String!): Message!
    }
`;