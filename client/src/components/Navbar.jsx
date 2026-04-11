import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));

        const handleStorage = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
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
