const cors = require("cors");
const ollama = require("../config/ollama");
const { formatJamb } = require("../utils/jambFormatter");
const db = require("../config/db");


async function detectSubject(question, deepseekClient){
    const prompt = `
    Detect the subject of this academic question. 
    Return ONLY one word: Math, Physics, Chemistry, Biology, Engligh, or General.

    Question: "${question}"
    `;

    const response = await ollama.chat({
        model: 'gpt-oss:120b',
        messages: [{ role: 'user', content: prompt }],
        })

    const text = response.message?.content?.trim().toLowerCase();

    if(["math", "physics", "chemistry", "biology", "english"].includes(text)){
        return text;
    }
    return "general";
}

exports.solveQuestion = async (req, res, next) =>{
    const { question, mode } =req.body;

    if(!question){
        return res.status(400).json({error: "Question is required"});
    }

    try{
        const subject = await detectSubject(question, ollama);
        let prompt;
        if (mode === "jamb") {
            
            prompt = `
            Answer this question as a JAMB exam tutor for the subject: ${subject}. 
            Answer the following question concisely in JAMB exam style.


            Return ONLY JSON like this:
            {
            "answer": "...",
            "explanation": "...",
            "tip": "..."
            }

            Question: ${question}
            `;
        } else {
            prompt = `
            Answer this academic question for the subject: ${subject}.

            Return ONLY JSON like this:
            {
            "answer": "...",
            "explanation": "...",
            "simplified": "..."
            }

            Question: ${question}
            `;
        }

        

       const response = await ollama.chat({
            model: 'gpt-oss:120b',
            messages: [{ role: 'user', content: prompt }],
        })

        const aiText = response.message?.content;

        const cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
      

        // Extract JSON object inside text
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
        console.error("AI response is not valid JSON:", aiText);
        return res.status(500).json({ error: "Failed to parse AI response" });
        }

        let parseResult;

        try {
            parseResult = JSON.parse(jsonMatch[0]);
        } catch(parseError){
            console.error("Error parsing AI response JSON:", parseError, "Original AI text:", aiText);
            return res.status(500).json({ error: "Failed to parse AI response" });
        }

        let answer = parseResult.answer || "No answer provided";
        let explanation = parseResult.explanation || "No explanation provided";
        let tip = parseResult.tip || "No tip provided";
        if(mode==="jamb"){
            const formatted = formatJamb(parseResult);
            answer = formatted.answer;
            explanation = formatted.explanation;
            tip = formatted.tip;
        }

            // Save to history
        await db.query(
            "INSERT INTO history (question, answer, explanation, tip, mode, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [question, answer, explanation, tip, mode, new Date()]
        );

            
        

        res.json({ answer, explanation, tip});

        


    } catch(error){
        console.error(error.response?.data|| error.message);
        next(error)
    }
}