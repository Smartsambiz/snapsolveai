const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const solveRoutes = require("./routes/solveRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 3000;

const corsOptions = {
  // MUST NOT have a trailing slash
  origin: 'https://snapsolveai-xi.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


const app = express();
app.use(cors(corsOptions));


app.use(express.json());



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://snapsolveai-xi.vercel.app', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Respond to preflight immediately
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});



app.use("/api", solveRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', cors: 'should work' });
});



app.use("/", (req, res)=>{
    res.send("Snapsolve AI Backend Running");
});



// error handler
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});