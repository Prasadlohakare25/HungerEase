const db = require('../utils/dbConnection');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Your Google API key for distance calculation
const GOOGLE_API_KEY = process.env.distance_API;

const getDistance = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
    try {
        const response = await axios.get(url);
        if (response.data.status !== 'OK') {
            throw new Error(`API error: ${response.data.status}`);
        }
        const distanceElement = response.data.rows[0].elements[0];
        if (distanceElement.status !== 'OK') {
            throw new Error(`Distance element error: ${distanceElement.status}`);
        }
        return distanceElement.distance.value; // distance in meters
    } catch (error) {
        console.error("Error fetching distance:", error.response ? error.response.data : error.message);
        // throw new Error('Error fetching distance');
    }
};

// const getDistance = async (origin, destination, next) => {
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
//     try {
//         const response = await axios.get(url);
//         const distance = response.data.rows[0].elements[0].distance.value; // distance in meters
//         return distance;
//     } catch (error) {
//         console.error("Error fetching distance:", error);
//         // throw new Error('Error fetching distance');
//         // next(error);
//         return next(errorHandler(404, "cannot calculate distance"));
//     }
// };

const signUp = async (req, res, next) => {
    const q1 = "INSERT INTO mess (`user_name`,`address`,`phone_number`,`email`,`associated_id`,`mess_pass`) VALUES (?)";

    const hashedPassword = bcryptjs.hashSync(req.body.password, 8);
    let ngoData;

    try {
        const q2 = "SELECT * FROM ngo";
        db.query(q2, async (err, data) => {
            if (err) {
                return res.status(500).send("Error fetching NGO data");
            }
            ngoData = data;

            let minDistance = Number.MAX_SAFE_INTEGER;
            let associatedId;

            for (let ngo of ngoData) {
                const distance = await getDistance(req.body.address, ngo.address);
                if (distance < minDistance) {
                    minDistance = distance;
                    associatedId = ngo.id;
                }
            }

            const values = [
                req.body.user_name,
                req.body.address,
                req.body.phone_number,
                req.body.email,
                associatedId,
                hashedPassword
            ];
            console.log(values);

            db.query(q1, [values], (err, data) => {
                if (err) {
                    return res.status(500).send("Cannot create user");
                }
                return res.status(201).json(data);
            });
        });
    } catch (err) {
        next(err);
    }
};

const signIn = (req, res, next) => {
    const { email, password } = req.body;

    try {
        const q2 = "SELECT * FROM mess WHERE email = (?)";

        db.query(q2, [email], (err, data) => {
            if (err) {
                return res.status(500).send('Error on the server.');
            }
            if (data.length === 0) {
                return res.status(404).send('No user found.');
            }
            const validUser = data[0];
            const passwordIsValid = bcryptjs.compareSync(password, validUser.mess_pass);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            // if (validUser.mess_pass != password) {
            //     return res.status(401).send({ auth: false, token: null });
            // }

            const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECKEY)//creating a token for authorisation
            const { mess_pass: pass, ...rest } = validUser;//to not show the password of the user to anyone we have destructured it and passed the rest of the data as a json(for security purposes)

            res.cookie('access_token', token, { httpOnly: true }, { expires: new Date(Date.now() + 60 * 60 * 1000) }).status(200).json(rest)//creating a cookie for authorisation and setting its age to 1 hour and http true for not giving access to any other third party app

        })
    } catch (err) {
        next(err);
    }
}

module.exports = { signUp, signIn };


// getDistance Function:

// This function makes a request to Google's Distance Matrix API to calculate the distance between the origin and destination addresses.
// It returns the distance in meters.


// signUp Function:

// First, it fetches all the NGO data from the ngo table.
// Then, for each NGO, it calculates the distance between req.body.address and ngo.address using the getDistance function.
// It keeps track of the minimum distance and the corresponding ngo.id.
// Finally, it inserts the new user into the mess table with the associated NGO ID.