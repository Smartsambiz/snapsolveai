import { NavLink } from "react-router-dom";
import "../App.css";

function Navbar(){
    return (
        <nav className="navbar">
            <h2 className="logo">SnapSolve AI</h2>

            <div className="nav-links">
                <NavLink to="/" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                <NavLink to="/solve" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Solve</NavLink>
                <NavLink to="/history" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>History</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;