import React, { useState } from 'react';

function Landing() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => setIsLogin(!isLogin);

    return (
        <div className="landing-page">
            <h1>Welcome to the Betting Room</h1>
            <div className="auth-form">
                {isLogin ? (
                    <div>
                        <h2>Login</h2>
                        <form>
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2>Sign Up</h2>
                        <form>
                            <input type="text" placeholder="Username" required />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
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
