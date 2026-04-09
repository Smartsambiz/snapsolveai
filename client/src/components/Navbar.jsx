import { Link } from "react-router-dom";
import "../App.css";

function Navbar(){
    return (
        <nav className="navbar">
            <h2 className="logo">SnapSolve AI</h2>

            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/solve" className="nav-link">Solve</Link>
            </div>
        </nav>
    )
}

export default Navbar;