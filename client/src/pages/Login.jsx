import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";


function Login(){
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        localStorage.removeItem("token");
        try{
            const response = await fetch("https://snapsolveai.onrender.com/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            let data = null;
            try {
                data = await response.json();
            } catch(parseError) {
                console.error("Login response parse failed", parseError);
            }

            console.log("Login response", response.status, data);

            if(response.ok && data?.token){
                localStorage.setItem("token", data.token);
                navigate("/solve");
            } else {
                const errorMessage = data?.error || response.statusText || "Login failed";
                console.error("Login failed", response.status, errorMessage, data);
                alert(errorMessage);
                localStorage.removeItem("token");
            }

        }catch(error){
            console.error("Login fetch error", error);
            alert(error.message || "Login failed.")
        }
    }

    return (
        <div className="card">

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="input-box"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="input-box"
            />

            <button onClick={handleLogin} className="btn-primary">
                Login
            </button>
            <p>Don't have an account? <Link to="/register" className="register-link">Register here</Link></p>
        </div>
    )
}

export default Login;
