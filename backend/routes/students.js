const express = require('express');
const Student = require('../models/student');
const router = express.Router();


router.post('', (req, res, next) => {
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


router.put('/:id', (req, res, next) => {
  const student = new Student({
    _id: req.body.id,
    name: req.body.name,
    course: req.body.course
  });
  Student.updateOne({_id: req.params.id}, student).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('', (req, res, next) => {
  Student.find().then(documents => {
    res.status(200).json({
      message: 'students fetched succesfully!',
      students: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id).then(student => {
     if(student) {
       res.status(200).json(student);
     } else {
       res.status(404).json({message: 'Student not found!'});
     }
  });
});

router.delete('/:id', (req, res, next) => {
  Student.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Student deleted!'});
  });
});

module.exports = router;