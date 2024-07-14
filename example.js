const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create a MySQL pool
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hungerEase'
});

// Test the connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database Connection successful');
        connection.release(); // Release the connection back to the pool
    }
});

// Endpoint to handle form submission
app.post('/api/submit-form', (req, res) => {
    const { field1, field2, field3 } = req.body;

    // Start transaction
    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send({ error: 'Error getting database connection' });
        }

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return res.status(500).send({ error: 'Transaction start failed' });
            }

            // Insert into first table
            const sql1 = 'INSERT INTO table1 (field1) VALUES (?)';
            connection.query(sql1, [field1], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).send({ error: 'Insert into table1 failed' });
                    });
                }

                const insertId = results.insertId; // Get the inserted ID

                // Insert into second table using the foreign key from the first table
                const sql2 = 'INSERT INTO table2 (field2, field3, foreign_key_field) VALUES (?, ?, ?)';
                connection.query(sql2, [field2, field3, insertId], (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).send({ error: 'Insert into table2 failed' });
                        });
                    }

                    // Commit transaction
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.status(500).send({ error: 'Transaction commit failed' });
                            });
                        }

                        connection.release();
                        res.status(200).send({ message: 'Data inserted successfully into both tables.' });
                    });
                });
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
