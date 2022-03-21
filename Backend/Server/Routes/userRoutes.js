const express = require('express')
const router = express.Router()
const usersController = require('../Controllers/usersController');

router.route('/')
    .post(usersController.addUser)

router.route('/:id')
    .put(usersController.editUsers)

module.exports = router