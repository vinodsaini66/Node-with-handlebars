var express = require('express');
var router = express.Router();
// const usersController = require('../controllers/UserController');
// const Auth = require("../middleware/auth");
/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('admin/login',{layout: false});
});

router.get('/signup', function(req, res, next) {
  res.render('admin/signup',{layout: false});
});


router.get('/add-user', function(req, res, next) {
  res.render('admin/users/addUser',{page:'Add User'});
});

router.get('/dashboard', function(req, res, next) {
  res.render('admin/dashboard',{page:'Dashboard'});
});

router.get('/users', function(req, res, next) {
  res.render('admin/users/userslist', {page: 'Users' ,title: 'Jobwick' ,condition: true,anyArray : [1,2,3,4,5]});
});





// router.post('/create', usersController.create);
// router.post('/register', usersController.register);
// router.get("/details",Auth.auth , usersController.findMe);
// router.get('/allUsers', Auth.auth , usersController.findAll);

module.exports = router;