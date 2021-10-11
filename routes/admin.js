var express = require('express');
var router = express.Router();
const usersController = require('../controllers/admin/UserController');
 const Auth = require("../middleware/auth");
/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('admin/login',{message: req.flash('error') ,layout: false});
});

router.get('/signup', function(req, res, next) {
  res.render('admin/signup',{layout: false});
});


router.get('/add-user', function(req, res, next) {
  res.render('admin/users/addUser',{page:'Add User'});
});

router.get('/dashboard',Auth.admin, function(req, res, next) {
            res.locals.error = req.flash('error');
            res.locals.user = req.flash('user') || null;
            console.log(req.session.user)
  res.render('admin/dashboard',{page:'Dashboard',user:req.session.user,loggedIn:req.flash('loggedIn')});
});

// router.get('/users', function(req, res, next) {
  
// });

router.post('/auth',usersController.login);

router.get('/users',Auth.admin, usersController.list);

router.get('/logout',Auth.admin, function(req, res, next) {
  req.session.loggedIn=false;
  
  req.session.user=null;
  res.redirect("/");

});





// router.post('/create', usersController.create);
// router.post('/register', usersController.register);
// router.get("/details",Auth.auth , usersController.findMe);


module.exports = router;