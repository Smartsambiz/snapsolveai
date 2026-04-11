import { useEffect, useState } from "react";
import "../App.css";

const getStoredToken = () => {
    let token = localStorage.getItem("token");
    if(!token) return null;

    token = token.trim();
    if(token.toLowerCase().startsWith("bearer ")){
        token = token.slice(7).trim();
    }

    if(token === "undefined" || token === "null" || token === ""){
        localStorage.removeItem("token");
        return null;
    }

    if((token.startsWith('"') && token.endsWith('"')) ||
       (token.startsWith("'") && token.endsWith("'"))){
        token = token.slice(1, -1).trim();
    }

    return token || null;
};

export default function History(){

    const [history, setHistory] = useState([]);

    useEffect(()=>{
        const token = getStoredToken();
        fetch("https://snapsolveai.onrender.com/api/history", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
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