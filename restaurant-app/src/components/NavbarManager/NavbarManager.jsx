import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSlice";
import { FaTachometerAlt, FaUsers, FaUtensils, FaReceipt, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./NavbarManager.css";

export default function NavbarManager() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar-vertical">
            {/* Logo Section */}
            <div className="nav-logo">
                <div className="logo-img-circle">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprwjEBhiuk3hZfs9jmbUmaF5V6P_1ZPmURw&s"
                        alt="Full Moon Logo"
                        className="logo-img"
                    />
                </div>
                <h1 className="brand-name">Full Moon</h1>
                <p className="brand-tagline">Where Taste Meets Tranquility</p>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
                <Link
                    to="/manager-dashboard"
                    className={`nav-link ${isActive("/manager-dashboard") ? "active" : ""}`}
                >
                    <FaTachometerAlt className="nav-icon" />
                    <span className="nav-text">Dashboard</span>
                </Link>

                <Link
                    to="/manager-dashboard/employees"
                    className={`nav-link ${isActive("/manager-dashboard/employees") ? "active" : ""}`}
                >
                    <FaUsers className="nav-icon" />
                    <span className="nav-text">Employees</span>
                </Link>

                <Link
                    to="/manager-dashboard/menus"
                    className={`nav-link ${isActive("/manager-dashboard/menus") ? "active" : ""}`}
                >
                    <FaUtensils className="nav-icon" />
                    <span className="nav-text">Menus</span>
                </Link>

                <Link
                    to="/manager-dashboard/orders"
                    className={`nav-link ${isActive("/manager-dashboard/orders") ? "active" : ""}`}
                >
                    <FaReceipt className="nav-icon" />
                    <span className="nav-text">Orders</span>
                </Link>

                <Link
                    to="/manager-dashboard/profile"
                    className={`nav-link ${isActive("/manager-dashboard/profile") ? "active" : ""}`}
                >
                    <FaUser className="nav-icon" />
                    <span className="nav-text">Profile</span>
                </Link>
            </div>

            {/* Logout Section */}
            <div className="nav-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt className="nav-icon" />
                    <span className="nav-text">Logout</span>
                </button>
            </div>
        </nav>
    );
}
