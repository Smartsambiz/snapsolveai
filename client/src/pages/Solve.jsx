import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";

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

export default function Solve(){
    const { setQuestion, setResult, jambMode, setJambMode } = useContext(AppContext);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile]= useState(null);


    useEffect(()=>{
        const token = getStoredToken();
        if(!token){
            navigate("/login");
        }
    }, [navigate]);

    const handleSolve = async ()=>{
        const token = getStoredToken();
        if(!token){
            navigate("/login");
            return;
        }

        setLoading(true);
        try{
            let response;
            if(file){
                const formData = new FormData();
                formData.append("image", file);
                formData.append("mode", jambMode ? "jamb" : "general");

                response = await fetch("https://snapsolveai.onrender.com/api/solve-image",{
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
            } else {
                response = await fetch("https://snapsolveai.onrender.com/api/solve-question",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        question: input,
                        mode: jambMode ? "jamb" : "general",
                    }),
                });
            }

            const data = await response.json();
            setQuestion(input);
            setResult(data);
            setLoading(false);

            console.log(data);
            navigate("/result");

        } catch(error){
            const message = error.response?.data?.error || "An error occurred while solving the question. Please try again.";
            alert(message);
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className="card">
            <h1 className="app-title">SnapSolve AI</h1>
            <p className="app-tagline">Type your question OR snap a picture</p>

            {/* JAMB TOGGLE */}
            <div>
                <p className="hero-text">
                    Mode: {" "}
                    <strong>{jambMode ? "JAMB Mode" : "General Mode"}</strong>
                </p>

                <button onClick={()=>setJambMode(!jambMode)}
                    className="toggle-btn"
                    >{jambMode ? "Switch to General Mode" : "Switch to JAMB Mode"}
                </button>
            </div>

            {/* Question Input */}
            <textarea 
                placeholder="Type your question here"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                className="input-box"
            />

            <label className="upload-area">
                Snap or Upload question image
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input"
                />
            </label>
            

            {/* Solve Button */}
            <button onClick={handleSolve} className="btn-primary"> {loading ? "Solving...": "Solve"}</button>
            {loading && <div className="loader"></div>}
        </div>
    );
}