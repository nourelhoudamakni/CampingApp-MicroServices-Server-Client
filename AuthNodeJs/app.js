var express = require('express');
const http=require('http');
const mongoose=require('mongoose');
require ('dotenv').config();
var AuthRouter=require('./routes/AuthRoutes');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();
app.use(cors());


app.use(express.json());

//connection to db
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=>{console.log('connected to DB')})
.catch((err)=>{console.log(err.message)});

app.use('/',AuthRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
  res.json(err.message);
});

//creation du serveur
const server=http.createServer(app);
server.listen(5000,()=>{
  console.log("app is running on port 5000");
})

module.exports = app;
