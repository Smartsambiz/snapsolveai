import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register(){
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();


    const handleRegister = async ()=>{
        try{
            const response = await fetch("https://snapsolveai.onrender.com/api/auth/register", {    
                method: "POST",
                body: JSON.stringify({ email, password, username }),
                headers: { "Content-Type": "application/json" },
            });

            if(response.ok){
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                const data = await response.json();
                alert(data.error || "Registration failed");
            }
        }catch(error){
            alert("Registration failed.")
        }
    }

    return (
        <div className="card">
            <h2>Register</h2>
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
            <input  
                type="text"
                placeholder="Username"
                value={username}    
                onChange={(e)=> setUsername(e.target.value)}
                className="input-box"
            />      
            <button onClick={handleRegister} className="btn-primary">Register</button>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    )
}

export default Register;