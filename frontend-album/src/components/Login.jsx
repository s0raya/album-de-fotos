import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


function Login() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                alert('Los campos no pueden estar vacíos')
                return navigate('/login')
            }
            await login(email, password)
            navigate('/home')
        } catch (error) {
            alert('Credenciales incorrectas')
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    placeholder="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input 
                    id="password"
                    name="password"
                    type="password" 
                    placeholder="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}


export default Login;