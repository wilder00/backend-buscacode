const {request, response} = require('express')

const login = async (req, res = response) =>{
  const {email, password} = req.body

  try {

    res.json({
      success: true,
      email,
      password,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error en Loginn",
      error
    })
  }

}


module.exports = {
  login 
}
