const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const scheduler = require('./scheduler'); // Include the scheduler
const cookieParser = require('cookie-parser');
const ngoRouter = require('./route/ngoAuth.route');
const messRouter = require('./route/messAuth.route');
dotenv.config({ path: './.env' });
const db = require('./utils/dbConnection');
const foodRouter = require('./route/food.route');
const { deleteOutdatedListings, scheduleTask } = require('./controller/foodList.controller')

const app = express();
app.use(cors());//this is used to convert the data from mysql to required type

//making the connection to the server


// Test the connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database Connection successful');
        connection.release(); // Release the connection back to the pool
    }
});

app.use(express.json());
app.use(cookieParser());
// Delete outdated listings on server start
deleteOutdatedListings();
// Schedule the daily task
scheduleTask();
app.use('/api/ngoAuth', ngoRouter);
app.use('/api/messAuth', messRouter);
app.use('/api/food', foodRouter);

app.listen(3002, () => {
    console.log("Listening on port 3002");
})