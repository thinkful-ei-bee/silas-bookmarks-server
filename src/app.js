'use strict';

require('dotenv').config();
const router = require('./router');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const validateBearerToken = require('./validateBearerToken');
const { NODE_ENV } = require('./config');
const errorHandler = require('./error-handling');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken());

app.use(router);

app.use(errorHandler);

module.exports = app;