const express = require('express');
const bodyParser = require('body-parser');
const Student = require('./models/student');
const mongoose = require('mongoose');
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/v1/students', (req, res, next) => {
  const student = new Student({
    name: req.body.name,
    course: req.body.course
  });
  student.save().then(schoolStudent => {
    res.status(201).json({
      message: 'Student added successfully',
      studentId: schoolStudent._id
    });
  });
});

app.get('/api/v1/students', (req, res, next) => {
  Student.find().then(documents => {
    res.status(200).json({
      message: 'students fetched succesfully!',
      students: documents
    });
  });
});

app.delete('/api/v1/students/:id', (req, res, next) => {
    Student.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Student deleted!'});
    });
});

module.exports = app;