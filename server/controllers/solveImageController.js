
const extractTextFromImage = require("../utils/extractText");
const {solveQuestionLogic} = require("../utils/solveQuestionLogic");




exports.solveImage = async (req, res, next) => {
    try{
        if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
        }   

        
        // Extract text from image
        const extractedQuestion = await extractTextFromImage(req.file.buffer);

        

        // Send the extracted text to your AI solve logic
        const mode = req.body.mode || "general"; // default to general mode
        const result = await solveQuestionLogic(extractedQuestion, mode);

        res.json(result);
    }    catch(err){
        console.error("Error processing image:", err);
        return res.status(500).json({ error: "Failed to process image" });
    }
}