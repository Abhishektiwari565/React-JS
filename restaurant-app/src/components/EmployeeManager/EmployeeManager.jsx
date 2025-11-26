import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../slices/EmployeeSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import "./EmployeeManager.css";

export default function EmployeeManager() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employee?.list || []);
    const status = useSelector((state) => state.employee?.status);
    const error = useSelector((state) => state.employee?.error);

    const [searchTerm, setSearchTerm] = useState("");
    const [employeeStats, setEmployeeStats] = useState({});
    const [invoices, setInvoices] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEmployees());
        }
    }, [status, dispatch]);

    // Fetch invoices to calculate employee performance
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get("http://localhost:3000/invoices");
                setInvoices(response.data);
                calculateEmployeeStats(response.data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchInvoices();
    }, []);

    // Calculate employee performance statistics
    const calculateEmployeeStats = (invoicesData) => {
        const stats = {};

        invoicesData.forEach(invoice => {
            const empId = invoice.employeeId;
            if (!empId) return;

            if (!stats[empId]) {
                stats[empId] = {
                    totalOrders: 0,
                    totalSales: 0,
                    avgOrderValue: 0,
                    customerCount: new Set()
                };
            }

            stats[empId].totalOrders += 1;
            stats[empId].totalSales += (invoice.total || 0);

            if (invoice.customerContact) {
                stats[empId].customerCount.add(invoice.customerContact);
            }
        });

        // Calculate averages
        Object.keys(stats).forEach(empId => {
            const empStats = stats[empId];
            empStats.avgOrderValue = empStats.totalOrders > 0 ? empStats.totalSales / empStats.totalOrders : 0;
            empStats.uniqueCustomers = empStats.customerCount.size;
        });

        setEmployeeStats(stats);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            dispatch(deleteEmployee(id));
        }
    };

    const handleUpdate = (id) => navigate(`/manager-dashboard/modify-employee/${id}`);
    const handleAdd = () => navigate("/manager-dashboard/modify-employee");

    // Filter employees by name
    const filteredEmployees = employees.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName || ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    // Calculate overall statistics
    const totalMonthlySalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const totalEmployeesSales = Object.values(employeeStats).reduce((sum, stat) => sum + stat.totalSales, 0);
    const totalEmployeesOrders = Object.values(employeeStats).reduce((sum, stat) => sum + stat.totalOrders, 0);

    return (
        <div className="employee-manager">
            {/* Header Section */}
            <div className="employee-header">
                <div className="header-content">
                    <h1 className="page-title">Employee Management</h1>
                    <p className="page-subtitle">Manage your restaurant team members and performance metrics</p>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-container">
                    <div className="search-input-wrapper">

                        <input
                            type="text"
                            placeholder="Search employees by name..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <button className="add-employee-btn" onClick={handleAdd}>
                    <span className="btn-icon">➕</span>
                    Add New Employee
                </button>
            </div>

            {/* Enhanced Stats Overview */}
            <div className="stats-overview">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3 className="stat-value">{employees.length}</h3>
                        <p className="stat-label">Total Employees</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3 className="stat-value">₹{totalMonthlySalary.toLocaleString()}</h3>
                        <p className="stat-label">Monthly Salary</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <h3 className="stat-value">{totalEmployeesOrders}</h3>
                        <p className="stat-label">Total Orders</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💸</div>
                    <div className="stat-content">
                        <h3 className="stat-value">₹{totalEmployeesSales.toLocaleString()}</h3>
                        <p className="stat-label">Total Sales</p>
                    </div>
                </div>
            </div>

            {/* Loading & Error States */}
            {status === "loading" && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading employees...</p>
                </div>
            )}

            {status === "failed" && (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <p className="error-message">{error}</p>
                </div>
            )}

            {/* Employees Grid */}
            {status === "succeeded" && (
                <div className="employees-container">
                    {filteredEmployees.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">👥</div>
                            <h3>No Employees Found</h3>
                            <p>Try adjusting your search criteria or add new employees.</p>
                            <button className="empty-action-btn" onClick={handleAdd}>
                                Add First Employee
                            </button>
                        </div>
                    ) : (
                        <div className="employees-grid">
                            {filteredEmployees.map(emp => {
                                const stats = employeeStats[emp.id] || {
                                    totalOrders: 0,
                                    totalSales: 0,
                                    avgOrderValue: 0,
                                    uniqueCustomers: 0
                                };

                                return (
                                    <div key={emp.id} className="employee-card">
                                        <div className="card-header">
                                            {emp.profileImage ? (
                                                <img
                                                    src={emp.profileImage}
                                                    className="employee-image"
                                                    alt={`${emp.firstName} ${emp.lastName}`}
                                                />
                                            ) : (
                                                <div className="employee-avatar">
                                                    {emp.firstName?.[0]?.toUpperCase() || "?"}
                                                </div>
                                            )}
                                            <div className="employee-basic-info">
                                                <h3 className="employee-name">{emp.firstName} {emp.lastName || ""}</h3>
                                                <p className="employee-email">{emp.email}</p>
                                                {/* Performance badge removed from here */}
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            {/* Six information items in three rows (2 columns per row) */}
                                            <div className="info-grid">
                                                {/* Row 1 */}
                                                <div className="info-item">
                                                    <span className="info-label">💰 Salary</span>
                                                    <span className="info-value">₹{emp.salary?.toLocaleString()}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">🕐 Shift</span>
                                                    <span className="info-value">{emp.shift || "Not assigned"}</span>
                                                </div>

                                                {/* Row 2 */}
                                                <div className="info-item">
                                                    <span className="info-label">📅 Joined</span>
                                                    <span className="info-value">{emp.joiningDate || "Not specified"}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">📦 Orders</span>
                                                    <span className="info-value highlight">{stats.totalOrders}</span>
                                                </div>

                                                {/* Row 3 */}
                                                <div className="info-item">
                                                    <span className="info-label">💸 Sales</span>
                                                    <span className="info-value highlight">₹{stats.totalSales.toLocaleString()}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">👥 Customers</span>
                                                    <span className="info-value">{stats.uniqueCustomers}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-actions">
                                            <button
                                                className="action-btn update-btn"
                                                onClick={() => handleUpdate(emp.id)}
                                            >
                                                <span className="btn-icon">✏️</span>
                                                Update
                                            </button>
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDelete(emp.id)}
                                            >
                                                <span className="btn-icon">🗑️</span>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}