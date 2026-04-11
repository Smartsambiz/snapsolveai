import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!getStoredToken());

        const handleStorage = () => {
            setIsLoggedIn(!!getStoredToken());
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return (
        <nav className="navbar">
            <h2 className="logo">SnapSolve AI</h2>

            <div className="nav-links">
                <NavLink to="/" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                {!isLoggedIn && (
                    <NavLink to="/login" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
                )}
                {isLoggedIn && (
                    <>
                        <NavLink to="/solve" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Solve</NavLink>
                        <NavLink to="/history" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>History</NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
