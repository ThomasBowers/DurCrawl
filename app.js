var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
const compression = require('compression');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var collegesRouter = require('./routes/colleges');
var createRouter = require('./routes/create');
var crawlRouter = require('./routes/crawl');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//compression
app.use(compression({level: 9}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/colleges', collegesRouter);
app.use('/about', aboutRouter);
app.use('/create', createRouter);
app.use('/crawl', crawlRouter);
app.use('/hillcrawl', crawlRouter);
app.use('/baileycrawl', crawlRouter);
app.use('/fullcrawl', crawlRouter);

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

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
