const express= require('express');
const router =express.Router();
const usersController = require('../controllers/apis/UserController');

router.post('/login',usersController.login);

module.exports = router;