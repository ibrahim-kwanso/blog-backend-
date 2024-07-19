const jwt = require("jsonwebtoken");
const statusCodes = require("../constants/statusCodes");
const SECRET_KEY = "VerySecret";

module.exports.authenticateToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if(!token){
        return res.status(statusCodes.BAD_REQUEST).json({error: "Token not in header"});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) return res.status(statusCodes.FORBIDDEN).json({error: err.message});

        req.user = user;
        next();
    })
}