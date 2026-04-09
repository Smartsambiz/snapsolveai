require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");



const geminiClient = new GoogleGenAI(process.env.GEMINI_API_KEY);

module.exports = geminiClient