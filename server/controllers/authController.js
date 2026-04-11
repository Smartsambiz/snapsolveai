const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
exports.register = async (req, res)=>{
    const {  email, password, username } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id, username, email",
            [email, hashedPassword, username]
        );

        if(result.rows.length === 0){
            return res.status(400).json({ error: "Failed to create user" });
        }

        res.status(201).json(result.rows[0]);

    }catch(err){
        console.error("Error during registration:", err);
        return res.status(500).json({ error: "User already exists" });
    }

}


exports.login = async (req, res)=>{
    const { email, password } = req.body;

    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(result.rows.length === 0){
            return res.status(400).json({ error: "User not found" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });

    }catch(err){
        console.error("Error during login:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}