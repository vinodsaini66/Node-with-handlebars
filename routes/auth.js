const express= require('express');
const router =express.Router();
const usersController = require('../controllers/UserController');

router.post('/login',usersController.login);

module.exports = router;