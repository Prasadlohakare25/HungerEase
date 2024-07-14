//making the connection to the server
const db = require('../utils/dbConnection')
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')


const signUp = (req, res) => {
    const q1 = "INSERT INTO ngo (`user_name`,`address`,`phone_number`,`email`,`ngo_pass`) VALUES (?)";

    const hashedPassword = bcryptjs.hashSync(req.body.password, 8);

    const values = [
        req.body.user_name,
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

const signIn = (req, res, next) => {
    const { email, password } = req.body;

    try {
        const q2 = "SELECT * FROM ngo WHERE email = ?";

        db.query(q2, [email], (err, data) => {
            if (err) {
                return res.status(500).send('Error on the server.');
            }
            if (data.length === 0) {
                return res.status(404).send('No user found.');
            }
            const validUser = data[0];
            const passwordIsValid = bcryptjs.compareSync(password, validUser.ngo_pass);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECKEY)//creating a token for authorisation
            const { ngo_pass: pass, ...rest } = validUser;//to not show the password of the user to anyone we have destructured it and passed the rest of the data as a json(for security purposes)

            res.cookie('access_token', token, { httpOnly: true }, { expires: new Date(Date.now() + 60 * 60 * 1000) }).status(200).json(rest)//creating a cookie for authorisation and setting its age to 1 hour and http true for not giving access to any other third party app

        })
    } catch (err) {
        next(err);
    }
}

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json('User Logged out successfully')
    } catch (error) {
        next(error)
    }
}

const getFoodListing = async (req, res, next) => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const q1 = "SELECT f.* FROM food f JOIN mess m ON f.mess_id = m.id JOIN ngo n ON m.associated_ID =n.id WHERE n.id = ? AND f.stat = 1 AND f.cur_date= ?";
        // AND f.cur_date = ?
        
        const value = [
            req.user.id,
        ]

        // console.log(value);
        db.query(q1, [value,today], (err, data) => {
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

// const listingDetail = async (req, res, next) => {
//     try {
//         const q1 = "SELECT * FROM food f JOIN mess m on f.mess_id = m.id WHERE f.id = (?)";
//         console.log(req);
//         const value = req.params.listingID;
//         console.log(value);
//         db.query(q1, [value], (err, data) => {
//             if (err) {
//                 return res.status(503).send("Cannot get Listing");
//             }
//             console.log(data);
//             res.json(data);
//         });
//     } catch (err) {
//         console.log("ERROR FETCHING LISTING", err);
//     }
// }

const listingDetail = async (req, res, next) => {
    try {
        const q1 = "SELECT f.cur_date, f.food_desc, f.no_of_person, m.email, m.phone_number, m.address, m.user_name FROM food f JOIN mess m ON f.mess_id = m.id WHERE f.id = ?";
        const value = req.params.id;

        db.query(q1, [value], (err, data) => {
            if (err) {
                console.error("Error executing query", err);
                return res.status(503).send("Cannot get Listing");
            }
            if (data.length === 0) {
                return res.status(404).send("Listing not found");
            }
            res.json(data[0]); // Send the first result, assuming IDs are unique
        });
    } catch (err) {
        console.log("ERROR FETCHING LISTING", err);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    signUp, signIn, signOut, getFoodListing, listingDetail
}