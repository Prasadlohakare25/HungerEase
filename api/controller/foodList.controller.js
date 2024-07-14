const db = require('../utils/dbConnection');
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
const schedule = require('node-schedule');

const createList = (req, res, next) => {

    const today = new Date().toISOString().slice(0, 10);
    // console.log(today);
    const q1 = "INSERT INTO food (`cur_date`,`no_of_person`,`food_desc`,`mess_id`) VALUES (?)";


    const values = [
        today,
        req.body.no_of_person,
        req.body.food_desc,
        req.body.mess_id
    ]

    db.query(q1, [values], (err, data) => {
        if (err) {
            // return res.json(err);
            return res.status(500).send("cannot create food listing");
        }
        // res.status(201);
        return res.json(data);
    })
}

const deleteList = (req, res, next) => {
    try {
        // const q1 = "SELECT * FROM food WHERE id = (?)";

        const value = req.params.id;
        // console.log(value);
        // let foodData;
        // db.query(q1, [value], (err, data) => {
        //     if (err) {
        //         return res.status(402).send("Error in the getting listing" + err);
        //     }
        //     foodData = data;
        // });
        const q2 = "DELETE  FROM food WHERE id = (?)";
        // const q2 = "UPDATE food SET stat = 0 WHERE id = (?)";
        // const value2 = foodData.id;
        db.query(q2, [value], (err, data) => {
            if (err) {
                return res.status(401).send("Error in removal " + err);
            }
            return res.json("Food data removed successfully");
        })
    } catch (err) {
        console.log("Error deleting " + err);
    }
}

const getListing = (req, res, next) => {
    try {
        const q1 = "SELECT * FROM food WHERE (mess_id,cur_date) = (?) AND stat = 1";
        // const value = req.user.id;
        const today = new Date().toISOString().slice(0, 10);
        // console.log(today);
        const value = [
            req.user.id,
            today
        ]
        // console.log(value);
        db.query(q1, [value], (err, data) => {
            if (err) {
                return res.status(501).send("cannot find any listing for the day");
            }
            // console.log(data);
            return res.json(data);
        });
    } catch (err) {
        console.log("here is error" + err);
    }
}


// Function to delete outdated listings
const deleteOutdatedListings = () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format

    const query = 'DELETE FROM food WHERE cur_date != ?';

    db.query(query, [today], (err, results) => {
        if (err) {
            console.error('Error deleting outdated listings:', err);
        } else {
            console.log(`Deleted ${results.affectedRows} outdated listings.`);
        }
    });
};

const scheduleTask = () => {
    schedule.scheduleJob('0 0 * * *', deleteOutdatedListings);
};

module.exports = { createList, deleteList, getListing,scheduleTask,deleteOutdatedListings }