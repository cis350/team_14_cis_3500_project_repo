import React, { useState } from 'react';
import { useUser } from './UserContext';

function Landing() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Needed for signup
    const { setUser } = useUser();

    const toggleMode = () => setIsLogin(!isLogin);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email, // Assuming username is the email for login
                    password: password
                })
            });
            
            const data = await response.json();
            setUser({ id: data.userId, email: email });
            console.log('Login successful:');
            // Save the email and token to localStorage
            localStorage.setItem('userEmail', email);
    
            // Optionally redirect or update UI based on successful login
            // Redirect to home page or other page
            window.location.href = '/home'; // Change as per your routing setup

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            console.log(JSON.stringify({
                name: username,
                email: email,
                password: password
            }));
            const response = await fetch('http://localhost:8001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            if (response.status === 201) {
                console.log('Signup successful:', data);
                // Handle successful signup here (e.g., redirect or login automatically)
            } else {
                throw new Error(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="landing-page">
            <h1>Welcome to the Betting Room</h1>
            <div className="auth-form">
                {isLogin ? (
                    <div>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignUp}>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                )}
                <button onClick={toggleMode}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
}

export default Landing;
