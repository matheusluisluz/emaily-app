const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const winston = require('./config/winston');
// const googleStrategy = require('./services/passport');

const app = express();

app.set('json spaces', 2);
app.use(routes);
app.use(morgan('combined', { stream: winston.stream }));
// googleStrategy.init();

module.exports = app;
