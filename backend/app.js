const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentsRoutes = require('./routes/students');
const app = express();

mongoose.connect('mongodb://localhost:27017/island-student').then(() => {
  console.log('DB Connection Successful!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.use('/api/v1/students', studentsRoutes);

module.exports = app;