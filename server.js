// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'D13M03@Y06',
  database: 'healthcare'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Patient registration
app.post('/api/patient/register', (req, res) => {
  const { fullname, mobile, email, password, dob, gender } = req.body;
  const sql = 'INSERT INTO patients (fullname, mobile, email, password, dob, gender) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [fullname, mobile, email, password, dob, gender], (err, result) => {
    if (err) return res.status(500).json({ message: 'Registration failed', error: err });
    res.status(200).json({ message: 'Patient registered' });
  });
});

// Patient login
app.post('/api/patient/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM patients WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login failed', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ message: 'Login successful' });
  });
});

// Doctor registration
app.post('/api/doctor/register', (req, res) => {
  const { doctorName, email, dob, education, experience, password } = req.body;
  const sql = 'INSERT INTO doctors (name, email, dob, education, experience, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [doctorName, email, dob, education, experience, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Registration failed', error: err });
    res.status(200).json({ message: 'Doctor registered' });
  });
});

// Doctor login
app.post('/api/doctor/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM doctors WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login failed', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ message: 'Login successful' });
  });
});

// Get list of doctors
app.get('/api/doctors', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch doctors', error: err });
    res.status(200).json(results);
  });
});

// Book appointment
app.post('/api/appointments', (req, res) => {
  const { doctorId, appointmentTime } = req.body;
  // For now we hardcode patient_id = 1 (replace with session/user id)
  const sql = 'INSERT INTO appointments (patient_id, doctor_id, appointment_time) VALUES (?, ?, ?)';
  db.query(sql, [1, doctorId, appointmentTime], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to book appointment', error: err });
    res.status(200).json({ message: 'Appointment booked' });
  });
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
  const sql = `SELECT appointments.id, patients.fullname AS patientName, appointments.appointment_time AS appointmentTime, appointments.status
               FROM appointments JOIN patients ON appointments.patient_id = patients.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch appointments', error: err });
    res.status(200).json(results);
  });
});

// Update appointment status
app.put('/api/appointments/:id/status', (req, res) => {
  const { status } = req.body;
  const appointmentId = req.params.id;
  const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
  db.query(sql, [status, appointmentId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to update status', error: err });
    res.status(200).json({ message: 'Status updated' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
