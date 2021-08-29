const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/v1/students', (req, res, next) => {
  const student = req.body;
  console.log(student);
  res.status(201).json({
    message: 'Student added successfully'
  });
});

app.get('/api/v1/students', (req, res, next) => {
  const students = [
    {
      id: 'fdgw84984',
      name: 'Sammie',
      course: 'Information Technology'
    },
    {
     id: '8fhfhdkfh',
     name: 'Issac',
     course: 'Philosophy'
    }
  ];
  res.status(200).json({
    message: 'students fetched succesfully!',
    students: students
  });
});

module.exports = app;