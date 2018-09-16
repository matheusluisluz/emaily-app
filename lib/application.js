const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const winston = require('./config/winston');

const app = express();

app.use(routes);
app.use(morgan('combined', { stream: winston.stream }));

module.exports = app;