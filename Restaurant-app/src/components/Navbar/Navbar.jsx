import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSlice"; // Adjust path if needed
import "./Navbar.css";

export default function Navbar({ onToggle, isCollapsed }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const isActive = (path) => location.pathname === path;

    const toggleMobileNav = () => {
        setIsMobileOpen(!isMobileOpen);
        onToggle && onToggle(!isMobileOpen);
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsMobileOpen(false);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            {isMobile && (
                <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
                    <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            )}

            {isMobile && isMobileOpen && (
                <div className="nav-overlay" onClick={toggleMobileNav}></div>
            )}

            <nav className={`navbar-vertical ${isCollapsed ? 'collapsed' : ''} ${isMobile && isMobileOpen ? 'mobile-open' : ''}`}>
                {/* Logo & Branding */}
                <div className="nav-logo">
                    <div className="logo-img-circle">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprwjEBhiuk3hZfs9jmbUmaF5V6P_1ZPmURw&s"
                            alt="Full Moon Logo"
                            className="logo-img"
                        />
                    </div>
                    <h1 className="brand-name">THE MOON</h1>
                    <p className="brand-tagline">Where Taste Meets Tranquility</p>
                </div>

                {/* Navigation Links */}
                <div className="nav-links">
                    <Link
                        to="/employee-dashboard"
                        className={`nav-link ${isActive("/employee-dashboard") ? "active" : ""}`}
                        onClick={() => isMobile && toggleMobileNav()}
                    >
                        <i className="nav-icon fas fa-chart-line"></i>
                        <span className="nav-text">Dashboard</span>
                    </Link>

                    <Link
                        to="/employee-dashboard/menu"
                        className={`nav-link ${isActive("/employee-dashboard/menu") ? "active" : ""}`}
                        onClick={() => isMobile && toggleMobileNav()}
                    >
                        <i className="nav-icon fas fa-book"></i>
                        <span className="nav-text">Menu</span>
                    </Link>

                    <Link
                        to="/employee-dashboard/order"
                        className={`nav-link ${isActive("/employee-dashboard/order") ? "active" : ""}`}
                        onClick={() => isMobile && toggleMobileNav()}
                    >
                        <i className="nav-icon fas fa-shopping-basket"></i>
                        <span className="nav-text">Orders</span>
                    </Link>

                    <Link
                        to="/employee-dashboard/profile"
                        className={`nav-link ${isActive("/employee-dashboard/profile") ? "active" : ""}`}
                        onClick={() => isMobile && toggleMobileNav()}
                    >
                        <i className="nav-icon fas fa-user"></i>
                        <span className="nav-text">Profile</span>
                    </Link>
                </div>

                {/* Logout Button */}
                <div className="nav-footer">
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        <i className="nav-icon fas fa-sign-out-alt"></i>
                        <span className="nav-text">Logout</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
