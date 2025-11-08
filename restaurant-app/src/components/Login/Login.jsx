import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, clearError } from "../../slices/AuthSlice";
import "./Login.css";

export default function Login() {
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, error, loading } = useSelector((state) => state.auth);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ firstName, password }));
    };

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (currentUser) {
            const path =
                currentUser.role === "manager"
                    ? "/manager-dashboard"
                    : "/employee-dashboard";

            navigate(path, { replace: true });
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        return () => dispatch(clearError());
    }, [dispatch]);

    return (
        <div className="login-page">
            {/* Background Decorative Elements */}
            <div className="login-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            {/* Main Container */}
            <div className={`login-container ${isLoaded ? "loaded" : ""}`}>
                {/* Left Side with Logo and Welcome */}
                <div className="login-image-section">
                    <div className="image-overlay"></div>
                    <div className="image-content">
                        <div className="welcome-logo">
                            <div className="logo-circle">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprwjEBhiuk3hZfs9jmbUmaF5V6P_1ZPmURw&s"
                                    alt="Signature Logo"
                                    className="logo"
                                />
                            </div>
                        </div>
                        <h1 className="welcome-title">Welcome Back</h1>
                        <p className="welcome-subtitle">
                            Continue your culinary journey with THE MOON Restaurant’s management system.
                        </p>
                    </div>
                </div>

                {/* Right Side Login Form */}
                <div className="login-form-section">
                    <div className="login-card">
                        <div className="login-header">
                            <h2>Welcome to THE MOON</h2>
                            <p>Please sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="login-input"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="login-input"
                                />
                            </div>

                            {error && (
                                <div className="error-message">
                                    <span className="error-icon">⚠️</span>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`login-btn ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>Having trouble signing in?</p>
                            <a href="#" className="help-link">Contact Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
