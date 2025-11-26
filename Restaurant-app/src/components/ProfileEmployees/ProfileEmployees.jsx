import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ProfileEmployees.css";

export default function ProfileEmployees() {
    const { currentUser } = useSelector(state => state.auth);
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                // Fetch employee info
                const resEmployees = await axios.get("http://localhost:3000/employees");
                const employee = resEmployees.data.find(emp => emp.id === currentUser.id);
                if (!employee) return setEmployeeData(null);

                // Fetch current orders
                const resOrders = await axios.get("http://localhost:3000/orders");
                const empOrders = resOrders.data.filter(o => o.employeeId === currentUser.id);

                // Fetch past invoices
                const resInvoices = await axios.get("http://localhost:3000/invoices");
                const empInvoices = resInvoices.data.filter(inv => inv.employeeId === currentUser.id);

                // Calculate totals
                const totalOrders = empOrders.length + empInvoices.length;
                const totalSales = [
                    ...empOrders,
                    ...empInvoices
                ].reduce((sum, o) => sum + o.total, 0);

                setEmployeeData({
                    ...employee,
                    totalOrders,
                    totalSales: parseFloat(totalSales.toFixed(2))
                });
            } catch (err) {
                console.error("Error fetching employee data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchEmployeeData();
    }, [currentUser]);

    if (loading) return (
        <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Loading profile...</p>
        </div>
    );

    if (!employeeData) return (
        <div className="profile-not-found">
            <p>Employee data not found.</p>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-content">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-image-container">
                        <img
                            src={employeeData.profileImage || "https://via.placeholder.com/150"}
                            alt={employeeData.firstName}
                            className="profile-image"
                        />
                        <div className="profile-image-overlay"></div>
                    </div>
                    <h1 className="profile-name">{employeeData.firstName}</h1>
                    <p className="profile-role">{employeeData.role}</p>
                    <div className="profile-accent"></div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-info">
                            <h3 className="stat-value">{employeeData.totalOrders}</h3>
                            <p className="stat-label">Total Orders</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-info">
                            <h3 className="stat-value">₹{employeeData.totalSales}</h3>
                            <p className="stat-label">Total Sales</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💼</div>
                        <div className="stat-info">
                            <h3 className="stat-value">₹{employeeData.salary}</h3>
                            <p className="stat-label">Monthly Salary</p>
                        </div>
                    </div>
                </div>

                {/* Employee Details */}
                <div className="details-section">
                    <h2 className="details-title">Personal Information</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Email Address</span>
                            <span className="detail-value">{employeeData.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Home Address</span>
                            <span className="detail-value">{employeeData.address}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Joining Date</span>
                            <span className="detail-value">{employeeData.joiningDate}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Work Shift</span>
                            <span className="detail-value shift-badge">{employeeData.shift}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Manager ID</span>
                            <span className="detail-value">{employeeData.managerId}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Employee ID</span>
                            <span className="detail-value employee-id">#{employeeData.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}