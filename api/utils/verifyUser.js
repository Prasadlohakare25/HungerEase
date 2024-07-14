const { errorHandler } = require("./error");
const jwt = require("jsonwebtoken");

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_seckey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "Unauthorized"));//is the token is not there in the browser

    jwt.verify(token, process.env.JWT_SECKEY, (err, user) => {
        if (err) return next(errorHandler(402, 'Forbidden'));//if some error happens in the middle of the verification

        req.user = user;
        next();//continue if everything goes well
    })
}

const verifyMess = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return next(errorHandler(401, "Unauthorized"));//is the token is not there in the browser

    jwt.verify(token, process.env.JWT_SECKEY, async (err, user) => {
        if (err) return next(errorHandler(402, 'Forbidden'));//if some error happens in the middle of the verification

        // console.log(user.id);

        try {
            const q1 = "SELECT * FROM mess WHERE id = (?)";
            const value = user.id;
            db.query(q1, [value], (err, data) => {
                if (err) {
                    return res.status(401).send("user not found");
                }
                console.log(data[0].category);
                if (data.category !== 'mess') {
                    return next(errorHandler(400, 'Only mess are allowed'))
                }
            })
        } catch (err) {
            next(errorHandler(401, "Unauthorizedd"));
        }
        req.user = await user;
        next();//continue if everything goes well
    })
}

module.exports = { verifyUser, verifyToken, verifyMess }