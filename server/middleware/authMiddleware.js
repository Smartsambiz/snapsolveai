const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next)=>{
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ error: "No token provided" });
    }

    if(token.startsWith("Bearer ")){
        token = token.slice(7);
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
     }catch(err){
        console.error("Invalid token:", err);
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = authMiddleware;