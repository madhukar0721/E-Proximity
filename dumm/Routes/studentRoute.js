

// const express = require('express');
import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt'
import multer from "multer";
import path from "path";



import session from 'express-session';

const router = express.Router();

router.use(express.json());

router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


// Sign In 

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const roles= 'Student';
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const query= 'INSERT INTO users (username, hashed_password, roles) VALUES (?, ?, ?)'; 

  
      // Insert the user into the database
      con.query(query, [username, hashedPassword,roles],(err, results) => {
        if (err) {
          console.error('Error inserting user into the database:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
          return;
        }
  
        const userId = results.insertId;
        req.session.user = { id: userId, username }; // Automatically sign in the user after sign-up
        res.json({ success: true, message: 'Sign up successful' });
      });
    } catch (bcryptErr) {
      console.error('Error hashing password:', bcryptErr);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

  router.post('/signin', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database for the user
    con.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return;
      }
  
      if (results.length > 0) {
        const user = results[0];
  
        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.hashed_password, (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            console.error('Error comparing passwords:', bcryptErr);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
          }
  
          if (bcryptResult) {
            req.session.user = user;
            res.json({ success: true, message: 'Sign in successful' });
          } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  });


  router.post('/signout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Sign out successful' });
  });
// TimeTable
router.post('/showtimetable', async (req, res) => {

    const timetable = req.body;

   
    let query = `
    SELECT branches.branch_code, subjects.sub_id, timetable.day, timetable.time_start, timetable.time_end
    FROM timetable 
    JOIN branches ON timetable.branch_code = branches.branch_code
    JOIN subjects ON timetable.sub_id = subjects.sub_id
    WHERE timetable.day = '${timetable['day']}'
      AND branches.branch_code = '${timetable['branch_code']}'
      AND timetable.time_start = '${timetable['time_start']}'
      `;
  
    let [result1] = await new Promise((resolve, reject) => {
      con.query(query, (err, result, fields) => {
        if (err) {
          console.error('Error recording : ' + err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  
  // console.log(result1)
    let sub_id = result1['sub_id'];
  
    // Second query
    const [result2] = await new Promise((resolve, reject) => {
      const query2 = `SELECT sub_name FROM students.subjects WHERE sub_id = '${sub_id}'; `;
      con.query(query2, (err, result, fields) => {
        if (err) {
          console.error('Error fetching subject name: ' + err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  
    // Use result2
    console.log(result2);
    res.send(result2)
  
  
  
  
  });


//  Attendance

  router.post('/create_attendance_record', (req, res) => {

    const attendance = req.body;
    const query = 'INSERT INTO attendance SET ?';
  
    sid = 'SLECT FROM '
  
    con.query(query, attendance, (err, result) => {
      if (err) {
        console.error('Error recording attendance: ' + err);
        res.status(500).send('Error recording attendance');
      } else {
        console.log('Attendance recorded:', result);
        res.status(201).send('Attendance recorded');
      }
    });
  });

  export { router as studentRouter };