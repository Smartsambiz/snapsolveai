import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const parseJwt = (token) => {
    if(!token) return null;
    try {
        const payload = token.split(".")[1];
        if(!payload) return null;
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            Array.from(atob(base64)).map((c) =>
                "%" + c.charCodeAt(0).toString(16).padStart(2, "0")
            ).join("")
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
};

const getStoredUserName = () => {
    const token = getStoredToken();
    const payload = parseJwt(token);
    return payload?.username || null;
};

function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const updateAuthState = () => {
        const token = getStoredToken();
        setIsLoggedIn(!!token);
        setUserName(getStoredUserName() || "");
    };

    useEffect(() => {
        updateAuthState();

        const handleStorage = () => {
            updateAuthState();
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2 className="logo">SnapSolve AI</h2>

            <div className="nav-links">
                <NavLink to="/" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                {isLoggedIn && (
                    <span className="nav-welcome">Welcome, {userName}</span>
                )}
                {!isLoggedIn && (
                    <NavLink to="/login" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
                )}
                {isLoggedIn && (
                    <>
                        <NavLink to="/solve" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Solve</NavLink>
                        <NavLink to="/history" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>History</NavLink>
                        <button onClick={handleLogout} className="nav-link nav-button" type="button">Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
