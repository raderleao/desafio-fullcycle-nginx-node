const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM people', (error, results) => {
    if (error) {
      throw error;
    }
    const names = results.map(result => result.name);
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${names.map(name => `<li>${name}</li>`).join('')}
      </ul>
    `);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  connection.connect(error => {
    if (error) {
      throw error;
    }
    console.log('Connected to database!');
  });
});
