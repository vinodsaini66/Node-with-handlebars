require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter =require('./routes/auth')
var postRouter = require('./routes/post');
var adminRouter = require('./routes/admin');

var hbs  = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout : 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuring the database
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");    
   
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Configuring the mysql database 
// const connection = require('./config/mysql_c.js');
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Server!');
// });
// app.get("/",(req,res) => {
//   connection.query('SELECT * from users LIMIT 1', (err, rows) => {
//       if(err) throw err;
//       console.log('The data from users table are: \n', rows);
//       connection.end();
//   });
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "AcdHz3LjemqvI872qrBpLY4B6SU3h56MexbzQpfWl1I1UgLzghtypLkUkl"}));
app.use(flash());
app.get('/test', function(req, res){
  if(req.session.page_views){
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
