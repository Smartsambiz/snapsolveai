const axios = require('axios');
require('dotenv').config();
const formData = require('form-data');

async function extractTextFromImage(buffer){
    try{

        console.log(process.env.OCR_API_KEY);
        const form = new formData();
        form.append("file", buffer, {filename: "image.jpg"});
        form.append('language', 'eng');
        form.append('isOverlayRequired', 'false');
        form.append('iscreatesearchablepdf', 'false');
        form.append('issearchablepdfhidetextlayer', 'false');

        
        const response = await axios.post(
            'https://api.ocr.space/parse/image',
            form,
            {
                
                maxBodyLength: Infinity,
                headers: {
                    ...form.getHeaders(),
                    apikey: process.env.OCR_API_KEY,
                },
            }
        );
        console.log("OCR API Response:", response.data);
        
        const result = response.data;

        const extractedText = result.ParsedResults?.[0]?.ParsedText?.trim() || "";
        console.log("Extracted Text:", extractedText);
        
        // Check if OCR was successful
        if (result.OCRExitCode !== 1) {
            console.error("OCR API Error:", result.ParsedResults?.[0]?.ErrorMessage || result.ParsedResults?.[0]?.ErrorDetails || "Unknown error");
            throw new Error(`OCR failed with exit code ${result.OCRExitCode}`);
        }
        
        if (!extractedText) {
            return result.ParsedResults?.[0]?.ErrorMessage || "No text extracted from image";
            throw new Error("No text parsed from image");
        }
        
        return extractedText;
        
        
        
    } catch(error){
        console.error("Error extracting text from image:", error);
        throw error;
    }
}

module.exports = extractTextFromImage;