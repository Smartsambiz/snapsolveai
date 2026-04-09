const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


const { solveImage } = require("../controllers/solveImageController");
const { solveQuestion } = require("../controllers/solveController");

router.post("/solve-image", upload.single("image"), solveImage);

router.post("/solve-question",  solveQuestion);

module.exports = router