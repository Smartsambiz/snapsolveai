const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const solveRoutes = require("./routes/solveRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
        origin: "https://snapsolveai-xi.vercel.app/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
}));
app.use(express.json());

app.use("/api", solveRoutes);

app.use("/", (req, res)=>{
    res.send("Snapsolve AI Backend Running");
});

// Solve endpoint
//app.use("/api", solveRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});