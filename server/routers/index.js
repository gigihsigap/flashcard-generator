"use strict"

const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

const Card = require('../controllers/cardController.js')
const User = require('../controllers/userController.js')

router.post('/user/register', User.register)
router.post('/user/login', User.login)

router.get('/cards', authentication, Card.list)
router.post('/cards', authentication, Card.add)
// router.put('/cards/:id', authentication, authorization, Card.edit)
// router.delete('/cards/:id', authentication, authorization, Card.delete)

router.put('/cards/:id', authentication, authorization, Card.edit)
router.delete('/cards/:id', authentication, authorization, Card.delete)

// router.post('/generate', authentication, Card.generate)
// router.post('/translate', authentication, Card.translate)

module.exports = router