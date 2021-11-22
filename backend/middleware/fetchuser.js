const jwt = require('jsonwebtoken');

const jwt_Secret = "Inotebook@suraj#isbest";  // signature of app

const fetchuserdata = (req, res, next) =>{

    // get user token using header
    const token = req.header('auth-token'); // getting token
    if (!token) {
        return res.status(400).json({ error : "Please authenticate using valid token"});
    }

    try {
        const data = jwt.verify(token, jwt_Secret); // verifying token
        req.user = data.user; // sending user
        next(); // calling next func.
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error : "Something went wrong"});
    }
}


module.exports = fetchuserdata;