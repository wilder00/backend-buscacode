require('dotenv').config()
const http = require('http')
const { appConfig, appUseGraphQl } = require('./app')
const { apolloServerConfig } = require('./app/graphql')
const port = process.env.PORT || 3000
//const database = require('./config/db.config')
const buscaLanguageDB = require('./config/databases/busca-language.db')

// database.test().then((version)=>{
//   console.info(`✔ Mysql ${version} conectado.`);
// }).catch(()=>{console.error('✗ Mysql no conectado.')})

buscaLanguageDB.query('SELECT version() as version').then((response) => {
  const version = response[0][0].version
  console.info(`✔ Sequelize - Mysql ${version} conectado.`);
}).then(() => {
  //console.log('database synchronized');
  buscaLanguageDB.sync({ alter: true }).then(() => {
    console.info('✔ Database - sequelize synchronized');
  }).catch((error) => {
    console.info('✗ Database - Sequelize No synchronized');
  });
}).catch((error) => { console.error('✗ Sequelize - Mysql no conectado.') })


const app = appConfig()
const httpServer = http.createServer(app);
const apolloServer = apolloServerConfig({ httpServer })

apolloServer.start().then(() => {
  appUseGraphQl(app, apolloServer)
  console.info(`✔ Server Graphql ready : http://localhost:${port}${app.get('appBaseGraphql')}`)
})

app.listen(port, () => {
  console.info(`✔ App usando el path: ${app.get('appBase') || '/'}`);
  console.info(`✔ App api escuchando en : http://localhost:${port}${app.get('appBaseApi')}`)
})