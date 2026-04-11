import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
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

export default function Home(){
    const { jambMode, setJambMode} = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="card">
            <h1 className="app-title">SnapSolve AI</h1>
            <p className="app-tagline">Snap it. Solve it.</p>

            {/* JAMB TOGGLE */}
            <div className="card hero-card">
                <p className="hero-text">
                    Mode: {" "}
                    <strong>{jambMode ? "JAMB Mode" : "General Mode"}</strong>
                </p>
                <p className="hero-text">Solve academic questions with ease</p>

                <button onClick={()=>setJambMode(!jambMode)}
                    className="toggle-btn"
                >
                    Toggle Mode
                </button>
            </div>

            {/* solve button */}

            <button
                onClick={() => {
                    const token = getStoredToken();
                    navigate(token ? "/solve" : "/login");
                }}
                className="btn-primary"
            >
                Solve a Question
            </button>

        </div>
    )
}