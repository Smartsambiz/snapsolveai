import { useEffect, useState } from "react";
import "../App.css";

export default function History(){

    const [history, setHistory] = useState([]);

    useEffect(()=>{
        fetch("https://snapsolveai.onrender.com/api/history")
        .then(response => response.json())
        .then(data => setHistory(data))
        .catch(error => {
            console.error("Error fetching history:", error);
        });
    }, []) ;

    return (
        <div className="card">
            <h2>History</h2>

            {history.map((item, index)=>(
                <div key={index} className="history-item">
                    <p><strong>Question:</strong> {item.question}</p>
                    <p><strong>Answer:</strong> {item.answer}</p>
                    <p><strong>Mode:</strong> {item.mode}</p>
                </div>
            ))}
        </div>
    )
}