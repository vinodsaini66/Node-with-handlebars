var express = require('express');
var router = express.Router();
const usersController = require('../controllers/UserController');
const Auth = require("../middleware/auth");
/* GET users listing. */

// router.get('/list', function(req, res, next) {
//   res.render('admin/userlist', { title: 'Jobwick' ,condition: true,anyArray : [1,2,3,4,5]});
// });

// router.get('/dashboard', function(req, res, next) {
//   res.render('admin/dashboard');
// });



router.post('/create', usersController.create);
router.post('/register', usersController.register);
router.get("/details",Auth.auth , usersController.findMe);
router.get('/allUsers', Auth.auth , usersController.findAll);

module.exports = router;
