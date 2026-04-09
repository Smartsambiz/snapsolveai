import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home(){
    const { jambMode, setJambMode} = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <h1 className="app-title">SnapSolve AI</h1>
            <p className="app-tagline">Snap it. Solve it.</p>

            {/* JAMB TOGGLE */}
            <div className="card hero-card">
                <p>
                    Mode: {" "}
                    <strong>{jambMode ? "JAMB Mode" : "General Mode"}</strong>
                </p>
                <p className="hero-text">Solve academic questions with ease</p>

                <button onClick={()=>setJambMode(!jambMode)}
                    className="btn-primary"
                >
                    Toggle Mode
                </button>
            </div>

            {/* solve button */}

            <button onClick={()=> navigate("/solve")} 
                className="btn-primary"
                >Solve a Question</button>

            
        </div>
    )
}