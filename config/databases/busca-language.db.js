const { Sequelize } = require('sequelize');

const {
  DB_BL_HOST: dbHost,
  DB_BL_PORT: dbPort,
  DB_BL_USER: dbUser,
  DB_BL_NAME: dbName,
  DB_BL_PASSWORD: dbPassword,
  DB_BL_DIALECT: dbDialect,
} = process.env

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  logging: false,// disable logging or provide a custom logging function; default: console.log
  port: dbPort,
});

// module.exports = {
//   buscaLanguageDB
// }

module.exports = sequelize