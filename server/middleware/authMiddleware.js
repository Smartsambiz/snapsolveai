const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next)=>{
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ error: "No token provided" });
    }

    token = token.trim();
    if(token.toLowerCase().startsWith("bearer ")){
        token = token.slice(7).trim();
    }

    if(!token){
        return res.status(401).json({ error: "No token provided" });
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