//making the connection to the server
const db = require('../utils/dbConnection')
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')


const signUp = async (req, res, next) => {
    const q1 = "INSERT INTO mess (`user_name`,`address`,`phone_number`,`email`,`associated_id`,`mess_pass`) VALUES (?)";

    const hashedPassword = bcryptjs.hashSync(req.body.password, 8);
    try {
        const q2 = "SELECT * FROM ngo";
        db.query(q1, [values], (err, data) => {
            if (err) {
                return res.json(err);
                // return res.status(500).send("cannot create user");
            }
            // res.status(201);
            const ngoData = data;
        });
    } catch (err) {
        next(err);
    }

    const values = [
        req.body.name,
        req.body.address,
        req.body.phone_number,
        req.body.email,
        hashedPassword
    ]

    db.query(q1, [values], (err, data) => {
        if (err) {
            return res.json(err);
            // return res.status(500).send("cannot create user");
        }
        // res.status(201);
        return res.json(data);
    });
}


module.exports = { signUp }