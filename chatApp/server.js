const { ApolloServer } = require("@apollo/server");
const { sequelize } = require("./models/index.js")
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs  = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer(){
  const { url } = await startStandaloneServer(server, {
    context: async({ req, res }) =>{
      const auth = req.headers
       return auth
    },
   listen: { port: 8000 },
 });
}
startServer()
console.log(`🚀 Server ready at 8000`);


sequelize
.authenticate()
.then(() => console.log('Database connected!!'))
.catch((err) => console.log(err))


