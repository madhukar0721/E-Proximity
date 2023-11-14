const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'madhukar',
  database: 'Students',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err);
  } else {
    console.log('Connected to the database');
  }
});

app.use(bodyParser.json());

// Create a new student record
app.post('/create_student_record', (req, res) => {
  const student = req.body;
  const query = 'INSERT INTO student_general_info SET ?';

  db.query(query, student, (err, result) => {
    if (err) {
      console.error('Error inserting student: ' + err);
      res.status(500).send('Error inserting student');
    } else {
      console.log('Student inserted:', result);
      res.status(201).send('Student inserted');
    }
  });
});

app.post('/update_student_record', (req, res) => {
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

  db.query(query, setValues, (err, result) => {
    if (err) {
      console.error('Error inserting student: ' + err);
      res.status(500).send('Error inserting student');
    } else {
      console.log('Student inserted:', result);
      res.status(201).send('Student inserted');
    }
  });
});






// Create a new subject
app.post('/create_subject_record', (req, res) => {
  const subject = req.body;
  const query = 'INSERT INTO Subjects SET ?';

  db.query(query, subject, (err, result) => {
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

// Record student attendance
app.post('/create_attendance_record', (req, res) => {

  const attendance = req.body;
  const query = 'INSERT INTO attendance SET ?';

  sid = 'SLECT FROM '

  db.query(query, attendance, (err, result) => {
    if (err) {
      console.error('Error recording attendance: ' + err);
      res.status(500).send('Error recording attendance');
    } else {
      console.log('Attendance recorded:', result);
      res.status(201).send('Attendance recorded');
    }
  });
});

app.post('/create_branch_record', (req, res) => {

  const attendance = req.body;
  const query = 'INSERT INTO branches SET ?';

  db.query(query, attendance, (err, result) => {
    if (err) {
      console.error('Error recording attendance: ' + err);
      res.status(500).send('Error recording attendance');
    } else {
      console.log('Attendance recorded:', result);
      res.status(201).send('Attendance recorded');
    }
  });
});



app.post('/showtimetable', async (req, res) => {

  const attendance = req.body;

  let query = `
  SELECT branches.branch_code, subjects.sub_id, timetable.day, timetable.time_start, timetable.time_end
  FROM timetable
  JOIN branches ON timetable.branch_code = branches.branch_code
  JOIN subjects ON timetable.sub_id = subjects.sub_id
  WHERE timetable.day = '${attendance['day']}'
    AND branches.branch_code = '${attendance['branch_code']}'
    AND timetable.time_start = '${attendance['time_start']}'
    `;

  let [result1] = await new Promise((resolve, reject) => {
    db.query(query, (err, result, fields) => {
      if (err) {
        console.error('Error recording attendance: ' + err);
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
    db.query(query2, (err, result, fields) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





    
