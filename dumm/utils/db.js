// const mysql = require('mysql2');
import mysql2 from 'mysql2';
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'madhukar',
    database: 'Students',
  });

con.connect((err) => {
if (err) {
    console.error('Database connection failed: ' + err);
} else {
    console.log('Connected to the database');
}
});

export default con;
