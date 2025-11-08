import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, fetchInvoices } from "../../slices/OrderSlice";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import "./DashboardEmployees.css";

// Colors for charts
const COLORS = {
    primary: "#3a7bd5",
    secondary: "#ff6b6b",
    accent: "#f4d35e",
    success: "#4caf50",
    warning: "#ff9800",
    info: "#6bc1ff",
    purple: "#9b59b6"
};

const CHART_COLORS = [
    "#3a7bd5", "#ff6b6b", "#f4d35e", "#6bc1ff",
    "#9b59b6", "#2ecc71", "#e74c3c", "#3498db"
];

export default function DashboardEmployees() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { orders, invoices } = useSelector((state) => state.orders);
    const [employeeData, setEmployeeData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchInvoices());
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            const filteredOrders = orders.filter(o => o.employeeId === currentUser.id);
            const filteredInvoices = invoices.filter(inv => inv.employeeId === currentUser.id);

            const combinedData = [
                ...filteredOrders.map(o => ({
                    ...o,
                    type: "Order",
                    date: o.date || new Date().toISOString()
                })),
                ...filteredInvoices.map(inv => ({
                    ...inv,
                    type: "Invoice",
                    date: inv.invoiceDate || new Date().toISOString()
                }))
            ];

            combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setEmployeeData(combinedData);
        }
    }, [orders, invoices, currentUser]);

    // Calculate metrics
    const totalOrders = employeeData.length;
    const totalRevenue = employeeData.reduce((sum, o) => sum + (o.total || 0), 0);
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    // Revenue trend data (last 7 entries for better visualization)
    const revenueTrendData = employeeData.slice(0, 7).reverse().map((item, index) => ({
        name: `Day ${index + 1}`,
        revenue: item.total || 0,
        type: item.type
    }));

    // Items distribution data
    const itemCounts = {};
    employeeData.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
                const itemName = item.itemName || "Unknown Item";
                itemCounts[itemName] = (itemCounts[itemName] || 0) + (item.quantity || 1);
            });
        }
    });

    const itemsDistributionData = Object.entries(itemCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

    // Revenue comparison data (Orders vs Invoices)
    const ordersTotal = employeeData.filter(item => item.type === "Order")
        .reduce((sum, item) => sum + (item.total || 0), 0);

    const invoicesTotal = employeeData.filter(item => item.type === "Invoice")
        .reduce((sum, item) => sum + (item.total || 0), 0);

    const revenueComparisonData = [
        { name: "Orders", value: ordersTotal, color: COLORS.primary },
        { name: "Invoices", value: invoicesTotal, color: COLORS.secondary }
    ];

    // Performance metrics
    const completedOrders = employeeData.filter(item =>
        item.status === "completed" || item.status === "Completed"
    ).length;

    const performanceRate = totalOrders ? (completedOrders / totalOrders) * 100 : 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="tooltip-value" style={{ color: entry.color }}>
                            {entry.name}: ₹{entry.value.toFixed(2)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`dashboard-employees ${isLoaded ? "loaded" : ""}`}>
            {/* Background Elements */}
            <div className="dashboard-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            <div className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Welcome, {currentUser?.firstName || "Employee"}</h1>
                    <p className="dashboard-subtitle">Your Performance Overview & Analytics</p>
                </div>

                {/* Summary Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon revenue">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Total Revenue</h3>
                            <p className="stat-number">₹{totalRevenue.toFixed(2)}</p>

                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orders">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Total Orders</h3>
                            <p className="stat-number">{totalOrders}</p>

                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon average">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 19V13C9 11.8954 9.89543 11 11 11H13C14.1046 11 15 11.8954 15 13V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11H18M9 19C9 20.1046 8.10457 21 7 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11H6M9 19V9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9V19M3 11V9C3 7.89543 3.89543 7 5 7H6M21 11V9C21 7.89543 20.1046 7 19 7H18M6 7V5C6 3.89543 6.89543 3 8 3H16C17.1046 3 18 3.89543 18 5V7M6 7H18"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Avg. Order Value</h3>
                            <p className="stat-number">₹{avgOrderValue.toFixed(2)}</p>

                        </div>
                    </div>


                </div>

                {/* Charts Section */}
                <div className="charts-section">
                    {/* Revenue Trend Chart */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h4>Revenue Trend Over Time</h4>
                            <p>Visualize your order and invoice revenue progression</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#a0b0d0"
                                    tick={{ fill: '#a0b0d0', fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="#a0b0d0"
                                    tick={{ fill: '#a0b0d0', fontSize: 12 }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke={COLORS.primary}
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: COLORS.primary }}
                                    activeDot={{ r: 8, stroke: COLORS.primary, strokeWidth: 2, fill: "#fff" }}
                                    name="Revenue"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Items Distribution Chart */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h4>Items Distribution</h4>
                            <p>Breakdown of your most popular menu items</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={itemsDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#a0b0d0"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    tick={{ fill: '#a0b0d0', fontSize: 11 }}
                                />
                                <YAxis
                                    stroke="#a0b0d0"
                                    tick={{ fill: '#a0b0d0', fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value) => [`${value} units`, "Quantity"]}
                                    contentStyle={{
                                        backgroundColor: 'rgba(27, 35, 64, 0.95)',
                                        border: `1px solid ${COLORS.primary}`,
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    name="Units Sold"
                                    radius={[4, 4, 0, 0]}
                                >
                                    {itemsDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Revenue Comparison Chart */}
                    <div className="chart-card full-width">
                        <div className="chart-header">
                            <h4>Revenue Comparison</h4>
                            <p>Compare order vs invoice performance</p>
                        </div>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={revenueComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#a0b0d0"
                                    tick={{ fill: '#a0b0d0', fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="#a0b0d0"
                                    tick={{ fill: '#a0b0d0', fontSize: 12 }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip
                                    formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
                                    contentStyle={{
                                        backgroundColor: 'rgba(27, 35, 64, 0.95)',
                                        border: `1px solid ${COLORS.primary}`,
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    name="Revenue"
                                    radius={[4, 4, 0, 0]}
                                >
                                    {revenueComparisonData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="recent-orders-section">
                    <div className="section-header">
                        <h3>Recent Orders & Invoices</h3>
                        <p>Your latest transactions</p>
                    </div>
                    <div className="table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total (₹)</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeData.slice(0, 8).map((item, index) => (
                                    <tr key={`${item.type}-${item.id}-${index}`}>
                                        <td>
                                            <span className={`type-badge ${item.type.toLowerCase()}`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="id-cell">#{item.id}</td>
                                        <td>{item.customerName || "Walk-in Customer"}</td>
                                        <td className="items-cell">
                                            {item.items && item.items.length > 0
                                                ? `${item.items[0].itemName || "Item"}${item.items.length > 1 ? ` +${item.items.length - 1} more` : ''}`
                                                : "No items"
                                            }
                                        </td>
                                        <td className="amount-cell">₹{(item.total || 0).toFixed(2)}</td>
                                        <td>
                                            <span className={`status-badge ${(item.status || 'completed').toLowerCase()}`}>
                                                {item.status || 'Completed'}
                                            </span>
                                        </td>
                                        <td className="date-cell">
                                            {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {employeeData.length === 0 && (
                            <div className="no-data">
                                <p>No orders or invoices found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}