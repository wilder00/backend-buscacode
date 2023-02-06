const {request, response} = require('express')

const getPackageVersion = async (req, res = response) =>{
  const packageVersion = process.env.npm_package_version
  const nodeEnv = process.env.NODE_ENV
  try {
    res.json({
      success: true,
      version: packageVersion,
      environment: nodeEnv,
      message: "Versión presente en package.json que representa la versión actual del proyecto."
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error en package version",
      error
    })
  }

}


module.exports = {
  getPackageVersion
}