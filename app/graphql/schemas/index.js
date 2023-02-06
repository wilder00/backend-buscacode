'use strict';
const { gql } = require('graphql-tag') //vscode extensión:  orsenkucher.vscode-graphql
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);


//const public = require('./public.schema')



const rootTypeDefs = gql`
  type Query {
    test: String
  }

  type Mutation {
    test: String
  }
`
const rootResolver = {
  Query: {
    test: ()=> 'test respuesta'
  }
}


const typeDefs = [
  rootTypeDefs,
  //public.typeDefs
]

const resolvers = [
  rootResolver,
  //public.resolver,
]


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-10) === '.schema.js');
  })
  .forEach(file => {
    const schema = require(path.join(__dirname, file));
    //const fileName = file.substring(0, file.length - 10) // -3 para quitar el .js
    typeDefs.push(schema.typeDefs)
    resolvers.push(schema.resolver)
  });



module.exports = {
  typeDefs,
  resolvers,
}
