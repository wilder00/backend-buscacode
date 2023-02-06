const mysql = require('mysql2');
const {
  DB_HOST: dbHost,
  DB_PORT: dbPort,
  DB_USER: dbUser,
  DB_NAME: dbName,
  DB_PASSWORD: dbPassword,
} = process.env

const connectionConfig = {
  host     : dbHost,
  port     : dbPort,
  user     : dbUser,
  database : dbName,
  password : dbPassword,
}

const connection = mysql.createConnection(connectionConfig);


const exec = (query, values)=>{
  return new Promise((resolve, reject)=>{
    
    connection.execute(query, values, (error,results, fields)=>{
        if(error) reject(error);
        resolve({results, fields})
      }
    );
  })
}

const test = async ()=>{
  try {
    const dbResponse = await exec('SELECT version() as version')
    const dbVersion = dbResponse.results[0]?.version
    return dbVersion    
  } catch (error) {
    throw error
  }
}

module.exports = {
  exec,
  test
}