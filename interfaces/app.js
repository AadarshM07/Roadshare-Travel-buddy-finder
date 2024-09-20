// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client

// Initialize express app
const app = express();

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: 'postgres',      // Replace with your PostgreSQL user
  host: 'localhost',         // Database host
  database: 'Yamate',   // Replace with your PostgreSQL database name
  password: 'QWERTY69',  // Replace with your PostgreSQL password
  port: 5432,                // Default PostgreSQL port
});

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { fullName, branch, date, departurePlace, destination, contactNo } = req.body;

  // Insert form data into PostgreSQL
  pool.query(
    'INSERT INTO users (full_name, branch, travel_date, departure_place, destination, contact_no) VALUES ($1, $2, $3, $4, $5, $6)',
    [fullName, branch, date, departurePlace, destination, contactNo],
    (error, results) => {
      if (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
      } else {
        res.send('Data submitted successfully!');
      }
    }
  );
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
