const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const goalsRoute = require('./routes/goals');
const tasksRoute = require('./routes/tasks');

mongoose.connect(
  'mongodb://localhost/daily-planner',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
.then(() =>{
  console.log('Connected to database.');
})
.catch(() =>{
  console.log('Connection to database failed.');
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // Allow Cross-Origin Resource Sharing (CORS) requests
  // Allow resources to be shared no matter what domain the app is sending the request from
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Only allow requests with Origin (...) headers to access resources
  // Optional, but if a header in not in this list, the request will be refused access
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // Only allow requests with GET (...) HTTP methods to access resources
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Forward routes
app.use('/api/goals', goalsRoute);
app.use('/api/tasks', tasksRoute);

module.exports = app;
