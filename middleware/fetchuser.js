require("dotenv").config();
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRETKEY;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); // Here the token value will be the http header that was sent while calling the Api

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token when token not given" })
    }
    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        if(!data) {
            return res.status(401).json({error: "Inavlid Token"})
        }
        req.user = data.user;
            next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token from catch" })
    }

}


module.exports = fetchuser;