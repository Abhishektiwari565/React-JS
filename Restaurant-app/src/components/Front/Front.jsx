import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Front.css";

export default function Front() {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className={`frontpage ${isLoaded ? "loaded" : ""}`}>
            <div className="background-container">
                <div className="moon-glow"></div>
                <div className="floating-orb orb1"></div>
                <div className="floating-orb orb2"></div>
            </div>

            <div className="main-container">
                <div className="logo-section">
                    <div className="logo-ring">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprwjEBhiuk3hZfs9jmbUmaF5V6P_1ZPmURw&s"
                            alt="Full Moon Logo"
                            className="logo-img"
                        />
                    </div>
                </div>

                <div className="content-section">
                    <h1 className="title">
                        <span className="title-main">THE MOON</span>
                        <span className="title-sub">Restaurant</span>
                    </h1>
                    <p className="tagline">Where Taste Meets Tranquility</p>
                    <div className="divider-line"></div>
                    <p className="description">
                        Dine beneath the serene glow of the moon — a blend of
                        flavors, artistry, and calm sophistication.
                    </p>
                </div>

                <div className="cta-section">
                    <button
                        className="enter-btn"
                        onClick={() => navigate("/login")}
                    >
                        <span className="btn-text">Enter THE MOON</span>
                        <span className="btn-arrow">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </button>
                </div>

                <div className="info-bar">
                    <div className="info-item">
                        <span className="info-label">Hours</span>
                        <span className="info-value">6PM - 11PM</span>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <span className="info-label">Location</span>
                        <span className="info-value">Gourmet District</span>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <span className="info-label">Reservations</span>
                        <span className="info-value">(555) 123-4567</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
