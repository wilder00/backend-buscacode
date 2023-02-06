require('dotenv').config()
const http = require('http')
const { appConfig, appUseGraphQl } = require('./app')
const { apolloServerConfig } = require('./app/graphql')
const port = process.env.PORT || 3000
const database = require('./config/db.config')

database.test().then((version)=>{
  console.info(`✔ Mysql ${version} conectado.`);
}).catch(()=>{console.error('✗ Mysql no conectado.')})

const app = appConfig()
const httpServer = http.createServer(app);
const apolloServer = apolloServerConfig({httpServer})

apolloServer.start().then(()=>{
  appUseGraphQl(app, apolloServer)
  console.info(`✔ Server Graphql ready : http://localhost:${port}${app.get('appBaseGraphql')}`)
})

app.listen(port, ()=>{
  console.info(`✔ App usando el path: ${app.get('appBase') || '/'}`);
  console.info(`✔ App api escuchando en : http://localhost:${port}${app.get('appBaseApi')}`)
})