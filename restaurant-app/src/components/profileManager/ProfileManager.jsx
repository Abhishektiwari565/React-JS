import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ProfileManager.css";

export default function ProfileManager() {
    const { currentUser } = useSelector(state => state.auth);
    const [managerData, setManagerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManagerData = async () => {
            try {
                // Fetch manager info
                const resEmployees = await axios.get("http://localhost:3000/employees");
                const manager = resEmployees.data.find(emp => emp.id === currentUser.id);
                if (!manager) return setManagerData(null);

                // Fetch all orders for performance metrics
                const resOrders = await axios.get("http://localhost:3000/orders");

                // Fetch all invoices for revenue tracking
                const resInvoices = await axios.get("http://localhost:3000/invoices");

                // Calculate manager performance metrics
                const totalOrdersManaged = resOrders.data.length;
                const totalRevenue = [
                    ...resOrders.data,
                    ...resInvoices.data
                ].reduce((sum, item) => sum + (item.total || 0), 0);

                // Calculate team size (employees managed)
                const teamSize = resEmployees.data.filter(emp =>
                    emp.role !== 'Manager' && emp.managerId === currentUser.id
                ).length;

                // Enhanced manager data with all details
                setManagerData({
                    ...manager,
                    totalOrdersManaged,
                    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
                    teamSize,
                    // Add any missing fields with default values
                    lastName: manager.lastName || "",
                    phoneNumber: manager.phoneNumber || "9526385691",
                    dateOfBirth: manager.dateOfBirth || "Not provided",
                    department: manager.department || "Restaurant Management",
                    employmentType: manager.employmentType || "Full-time",
                    managerId: manager.managerId || "Self",
                    employeeId: manager.employeeId || manager.id
                });
            } catch (err) {
                console.error("Error fetching manager data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchManagerData();
    }, [currentUser]);

    if (loading) return (
        <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Loading profile...</p>
        </div>
    );

    if (!managerData) return (
        <div className="profile-not-found">
            <p>Manager data not found.</p>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-content">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-image-container">
                        <img
                            src={managerData.profileImage || "https://via.placeholder.com/150"}
                            alt={managerData.firstName}
                            className="profile-image"
                        />
                        <div className="profile-image-overlay"></div>
                        <div className="profile-role-badge">
                            {managerData.role?.toUpperCase()}
                        </div>
                    </div>
                    <h1 className="profile-name">{managerData.firstName} {managerData.lastName}</h1>
                    <p className="profile-role">Restaurant Manager</p>
                    <div className="profile-accent"></div>
                </div>

                {/* Stats Cards */}


                {/* Personal Information */}
                <div className="details-section">
                    <h2 className="details-title">Personal Information</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Full Name</span>
                            <span className="detail-value">{managerData.firstName} {managerData.lastName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Email Address</span>
                            <span className="detail-value email-value">{managerData.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Phone Number</span>
                            <span className="detail-value">{managerData.phoneNumber}</span>
                        </div>

                        <div className="detail-item full-width">
                            <span className="detail-label">Home Address</span>
                            <span className="detail-value address-value">{managerData.address}</span>
                        </div>
                    </div>
                </div>

                {/* Professional Information */}
                <div className="details-section">
                    <h2 className="details-title">Professional Information</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Employee ID</span>
                            <span className="detail-value employee-id">#{managerData.employeeId}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Manager ID</span>
                            <span className="detail-value manager-id">#{managerData.id}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Role</span>
                            <span className="detail-value role-badge">{managerData.role}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Department</span>
                            <span className="detail-value department-badge">{managerData.department}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Employment Type</span>
                            <span className="detail-value employment-badge">{managerData.employmentType}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Joining Date</span>
                            <span className="detail-value joining-date">{managerData.joiningDate}</span>
                        </div>
                    </div>
                </div>

                {/* Work Schedule & Compensation */}
                <div className="details-section">
                    <h2 className="details-title">Work Schedule & Compensation</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Work Shift</span>
                            <span className="detail-value shift-badge">{managerData.shift}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Monthly Salary</span>
                            <span className="detail-value salary-amount">₹{managerData.salary?.toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Annual Salary</span>
                            <span className="detail-value salary-amount">₹{(managerData.salary * 12)?.toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Reporting To</span>
                            <span className="detail-value">{managerData.managerId}</span>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}