import { useState } from "react";
import {useDispatch} from "react-redux"
import {login} from "../../redux/apiCalls"

export default function Login() {
    const [username, setUsername]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch()
   
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    }
    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ marginBottom: "2rem", fontSize: "2rem" }}>Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                id="username"
                style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "none", marginBottom: "1rem" }}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                id="password"
                style={{ padding: "0.5rem", borderRadius: "0.5rem", border: "none", marginBottom: "1rem" }}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                style={{ 
                    padding: "0.5rem 1rem", 
                    borderRadius: "0.5rem", 
                    border: "none", 
                    backgroundColor: "#0077cc", 
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
                onClick={handleClick}
            >
                Login
            </button>
        </div>
    )
}
