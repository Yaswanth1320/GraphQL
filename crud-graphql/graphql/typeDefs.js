const { gql } = require('@apollo/server');

module.exports = `#graphql

    type Recipe{
        _id: ID!
        name: String!
        description: String!
        createdAt: String!
        thumpsUp: Int!
        thumpsDown: Int!
    }

    input RecipeInput{
        name: String!
        description: String!
    }

    type Query{
        getRecipe(_id: ID!): Recipe!
        recipes: [Recipe]
    }

    type Mutation{
        createRecipe(recipeinput: RecipeInput!): Recipe!
        editRecipe(_id:ID!, recipeinput: RecipeInput!): Boolean
        deleteRecipe(id:ID!): Boolean
    }

`