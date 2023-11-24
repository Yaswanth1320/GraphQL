

module.exports = `#graphql

    type User{
        username: String!
        email: String!
        token: String
        createdAt: String
    }
    type Query {
        getUsers: [User]!
        users: [User]!
        login(email: String!,password: String!): User!
    }
    type Mutation {
        register(
            username: String!,
            email: String!
            password: String!,
            confirmpassword: String!
            ): User!
    }
`;