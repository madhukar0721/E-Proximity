// const express = require('express');
import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";



const router = express.Router();

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






































export { router as facultyRouter };