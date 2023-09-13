const jwt = require('jsonwebtoken')
const JWT_SECRET = "akashworkI$ng"

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token')
    if(!token) {
        res.status(401).send({error : "Please authenticate using valid token"})
    }
    try {
        const ans = jwt.verify(token, JWT_SECRET);
        req.user = ans.user;
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate using valid token"})
    }
}

module.exports = fetchuser;