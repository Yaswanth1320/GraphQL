module.exports = `#graphql

    type User{
        id: ID
        username: String!
        email: String
        token: String
        imageUrl: String
        createdAt: String
        latestMessage: Message
    }
    type Reaction{
        uuid: String!
        content: String!
        createdAt: String
        message: Message!
        user: User!
    }
    type Message{
        uuid: String!
        content: String!
        from: String!
        to: String!
        createdAt: String
        reactions: [Reaction]!
    }
    type Query {
        getUsers: [User]!
        users: [User]!
        login(email: String!,password: String!): User!
        deleteUser(id: ID!): User
        getMessages(from:String!): [Message]!
        getReactions: [Reaction]!
    }
    type Mutation {
        register(
            username: String!,
            email: String!
            password: String!,
            confirmpassword: String!
            ): User!
        sendMessage(to:String!, content:String!): Message!
        reactToMessage(uuid: String!, content: String!): Reaction!
    },
    type Subscription{
        newMessage: Message!
    }
`;
