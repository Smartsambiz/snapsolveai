import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

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
                    const token = localStorage.getItem("token");
                    navigate(token ? "/solve" : "/login");
                }}
                className="btn-primary"
            >
                Solve a Question
            </button>

        </div>
    )
}