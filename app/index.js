
const { expressMiddleware } = require('@apollo/server/express4')
const express = require('express')
const cors = require('cors')


const app = express()
const routes = require('./routes')

const appBase = process.env.APP_BASE && (process.env.APP_BASE === '/'? '' : process.env.APP_BASE) || ''
app.set('appBase', appBase)
app.set('appBaseApi', `${appBase}/api`)
app.set('appBaseGraphql', `${appBase}/graphql`)

module.exports.appConfig = (config)=>{
  const { apolloServer } = config || {}
  app.use(cors('*'))
  app.use(express.json())
  app.use(app.get('appBaseApi'), routes)
  return app
}

module.exports.appUseGraphQl = (app, apolloServer)=>{
  app.use(app.get('appBaseGraphql'),
    expressMiddleware( apolloServer, /* { context: async ({ req }) => ({ token: req.headers.token }),} */),
  );
}