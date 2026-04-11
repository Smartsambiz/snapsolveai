import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Login(){
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        try{
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("token", response.token);

            if(response.ok){
                navigate("/solve");
            } else {
                const data = await response.json();
                alert(data.error || "Login failed");
            }

        }catch(error){
            alert("Login failed.")
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
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    )
}

export default Login;
