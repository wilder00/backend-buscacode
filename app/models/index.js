'use strict';

const fs = require('fs');
const path = require('path');
//const Sequelize = require('sequelize');
const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || 'development';
const models = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'model.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    const fileName = file.substring(0, file.length - 8) // -3 para quitar el .js
    models[fileName] = model;
  });

// Object.keys(models).forEach(modelName => {
//   if (models[modelName].associate) {
//     models[modelName].associate(models);
//   }
// });

// Se está exportando los modelos según el nombre del archivo sin .js
module.exports = models;
