
const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')

const { typeDefs , resolvers} = require('./schemas')


module.exports.apolloServerConfig = (config)=>{
  const { httpServer } = config || {}

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  return apolloServer
}
