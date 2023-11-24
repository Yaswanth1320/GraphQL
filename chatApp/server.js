const { ApolloServer } = require("@apollo/server");
const { sequelize } = require("./models/index.js")
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs  = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    "name": "yaswanth"
  },
});

const { url } = startStandaloneServer(server,{
  listen: { port: 8000 },
});
console.log(`🚀 Server ready at 8000`);

sequelize
.authenticate()
.then(() => console.log('Database connected!!'))
.catch((err) => console.log(err))


