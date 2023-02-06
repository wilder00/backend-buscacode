const { Router } = require('express')
const router = Router()

const publicController = require('../controllers/public.controller')

router.get('/', publicController.getPackageVersion)

module.exports = router 