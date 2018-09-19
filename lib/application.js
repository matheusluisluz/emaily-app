const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const winston = require('./config/winston');
const passport = require('./services/passport');

const app = express();

app.set('json spaces', 2);

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;
