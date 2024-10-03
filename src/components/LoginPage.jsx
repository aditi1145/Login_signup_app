import React, { useState } from 'react';
import './AuthForm.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import illustration from '../assets/signin_illustration.png'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
     const handlesignin = () => {
     navigate('/login'); 
  }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-signup-container">
            <div className="illustration">
                <div className="illustration-content">
                    <img src={illustration} alt="Signin Illustration" />
                </div>
            </div>
            <div className="auth-form-container">
                <form onSubmit={handleLogin} className="auth-form">
                    <h3>Let us know !</h3>
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="sign-btn">Sign In</button>
                    <button className="switch-btn" onClick={handleSignin}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
