const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const { Router } = require('express')
const router = Router()

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-10) === '.routes.js');
  })
  .forEach(file => {
    const routes = require(path.join(__dirname, file));
    const fileName = file.substring(0, file.length - 10) // -3 para quitar el .js
    router.use(`/${fileName}`, routes)
  });

//const publicRouter = require('./public.routes')

//router.use('/public', publicRouter)
router.get('/', (req,res)=>{ return res.json({success: true, message: "Funciona"})})

module.exports = router