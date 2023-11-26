import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();


// Students
router.post('/create_student_record', (req, res) => {
    const student = req.body;
    const query = 'INSERT INTO student_general_info SET ?';

    con.query(query, student, (err, result) => {
        if (err) {
            console.error('Error inserting student: ' + err);
            return res.json({ Status: false, Error: "Query Error" })
        } else {
            console.log('Student inserted:', result);
            return res.json({ Status: true })
        }
    });
});


router.post('/update_student_record', (req, res) => {
    const student = req.body;
    const studentId = student['student_id']
    delete student.student_id;
    // const setClause = Object.keys(student).map((key) => `${key} = ?`).join(', ');
    // console.log(setClause)
    const values = Object.values(student);

    const setValues = [];
    const setFields = [];

    for (const key in student) {
        setFields.push(`${key} = ?`);
        setValues.push(student[key]);
    }

    setValues.push(studentId);
    const query = `UPDATE student_general_info SET ${setFields.join(', ')} WHERE student_id = ?`;


    console.log(query)

    con.query(query, setValues, (err, result) => {
        if (err) {
            console.error('Error inserting student: ' + err);
            res.status(500).send('Error inserting student');
        } else {
            console.log('Student inserted:', result);
            res.status(201).send('Student inserted');
        }
    });
});


// Subjects
router.post('/create_subject_record', (req, res) => {
    const subject = req.body;
    const query = 'INSERT INTO Subjects SET ?';
  
    con.query(query, subject, (err, result) => {
      if (err) {
        if (student)
          console.error('Error inserting subject: ' + err);
        res.status(500).send('Error inserting subject');
      } else {
        console.log('Subject inserted:', result);
        res.status(201).send('Subject inserted');
      }
    });
  });




// Branch

router.post('/create_branch_record', (req, res) => {

    const attendance = req.body;
    const query = 'INSERT INTO branches SET ?';
  
    con.query(query, attendance, (err, result) => {
      if (err) {
        console.error('Error recording branch: ' + err);
        res.status(500).send('Error recording branch');
      } else {
        console.log('Branch recorded:', result);
        res.status(201).send('Branch recorded');
      }
    });
  });


// TimeTable




















  export { router as adminRouter };