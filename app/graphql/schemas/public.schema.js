

const { gql } = require('graphql-tag')

const packageVersion = process.env.npm_package_version
const nodeEnv = process.env.NODE_ENV


const typeDefs = gql`
  type version {
    id: ID
    version: String
  },

  extend type Query {
    #version(alias: String!, available: Boolean): version
    version: version
  }

  # extend type Mutation{
  #   crearEncuesta(
  #     nombre: String,
  #     marcador_padre: Int
  #   ): Marcador
  # }
`


const resolver = {
  Query:{
    //version : async ( _ , { alias, available } )=>{
    version : async ( _ )=>{
      let version= {
        version: packageVersion,
        environment: nodeEnv,
      }
      return version
    },
  },
  Mutation:{
    // (parent, args))
    // crearMarcador: async (_, {nombre, marcador_padre})=>{
    //   const newMarcadorId = await marcador.createOne({
    //     nombre,
    //     marcador_padre,
    //   })
    //   const newMarcador = await marcador.findById(newMarcadorId)
    //   return newMarcador
    // }
  }
}

module.exports = {
  typeDefs,
  resolver
}