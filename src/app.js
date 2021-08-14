require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// Router requirements
const userTypeRouter = require('./routers/user-type-router');
const feelingRouter = require('./routers/feeling-router');
const identifierRouter = require('./routers/identifier-router');
const advFeelingRouter = require('./routers/adv-feeling-router');

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

// API AUTHORIZATION
app.use(validateBearerToken = (req, res, next) => {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  debugger;

  if ( !authToken || authToken.split(' ')[1] !== apiToken ) {
    debugger;
    return res.status(401).json({
      error: 'Unauthorized request'
    })
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, EMOLINGS!')
});

app.use('/api/user-type', userTypeRouter);
app.use('/api/feeling', feelingRouter);
app.use('/api/adv-feeling', advFeelingRouter);
// app.use('/api/coping-skill', copingSkillRouter);
// app.use('/api/severity', severityRouter);
app.use('/api/identifier', identifierRouter);
// app.use('/api/reminder', reminderRouter);

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})


module.exports = app