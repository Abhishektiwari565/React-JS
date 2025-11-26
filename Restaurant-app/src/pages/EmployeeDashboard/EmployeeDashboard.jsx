import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import MenuEmployees from "../../components/MenuEmployees/MenuEmployees";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";
import ProfileEmployees from "../../components/ProfileEmployees/ProfileEmployees";
import DashboardEmployees from "../../components/DashboardEmployees/DashboardEmployees";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Listen for navbar state changes
    const handleNavbarToggle = (collapsed) => {
        setIsNavbarCollapsed(collapsed);
    };

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className="employee-dashboard">
            <Navbar onToggle={handleNavbarToggle} />
            <div className={`dashboard-content ${isNavbarCollapsed && !isMobile ? 'collapsed' : ''}`}>
                <Routes>
                    <Route path="/" element={<DashboardEmployees />} />
                    <Route path="/menu" element={<MenuEmployees />} />
                    <Route path="/order" element={<PlaceOrder />} />
                    <Route path="/profile" element={<ProfileEmployees />} />
                </Routes>
            </div>
        </div>
    );
}