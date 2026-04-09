import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Result(){
    const { result, jambMode } = useContext(AppContext);
    const navigate = useNavigate();

    if(!result) return <p>No result</p>;

    return (
        <div className="card result-card">
            <div className="result-block">
                <h2 className="result-title">
                    {jambMode ? "JAMB Solution" : "General Solution"}
                </h2>
                <h2 className="answer">✅ Answer</h2>
                <p>{result.answer}</p>
            </div>

            <div className="result-block">

                <h3 className="explanation">📘 Explanation</h3>
                <p style={{whiteSpace:"pre-line"}}>{result.explanation}</p>

                {jambMode && (
                    <div className="result-block">
                        <h3 className="tip">💡 JAMB Tip</h3>
                        <p> {result.tip} </p>
                    </div>
                )}

                <button onClick={()=> navigate("/solve")} className="btn-primary">Try Another Question</button>
            </div>
            
        </div>
    )
}