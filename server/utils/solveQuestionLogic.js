
const { solveQuestion } = require("../controllers/solveController");

exports.solveQuestionLogic = async (questionText, mode= "general")=>{
    const req = { body: {
        question: questionText,
        mode
        }  
    };

    const res = { json: (data) => {resData = data},
                status: ()=>({json: (data)=>{ resData = data}}) 
                };
    await solveQuestion(req, res, (err)=>{ if(err)console.error(err)});
    return resData;

}