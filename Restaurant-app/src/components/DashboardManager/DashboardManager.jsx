// src/components/ManagerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ComposedChart
} from "recharts";
import "./DashboardManager.css";

export default function DashboardManager() {
    const [employees, setEmployees] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [salesPeriod, setSalesPeriod] = useState("daily");
    const [salesData, setSalesData] = useState([]);
    const [topDishes, setTopDishes] = useState([]);
    const [topEmployees, setTopEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [revenueTrend, setRevenueTrend] = useState([]);
    const [categorySales, setCategorySales] = useState([]);
    const [hourlySales, setHourlySales] = useState([]);
    const [customerMetrics, setCustomerMetrics] = useState({
        avgOrdersPerCustomer: 0,
        avgCustomerValue: 0,
        repeatCustomers: 0
    });
    const [performanceRadar, setPerformanceRadar] = useState([]);
    const [loading, setLoading] = useState(true);

    // Colors for charts
    const COLORS = ['#ffd700', '#4ade80', '#60a5fa', '#f87171', '#a78bfa', '#fb923c', '#2dd4bf', '#f472b6'];

    // Fetch employees and invoices
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, invRes] = await Promise.all([
                    axios.get("http://localhost:3000/employees"),
                    axios.get("http://localhost:3000/invoices"),
                ]);
                setEmployees(empRes.data);
                setInvoices(invRes.data);
                setFilteredInvoices(invRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter invoices by employee name and date range
    useEffect(() => {
        let data = [...invoices];

        // Filter by employee name
        if (selectedEmployee) {
            const employee = employees.find(emp => emp.id === selectedEmployee);
            if (employee) {
                data = data.filter(inv => inv.employeeName === employee.firstName);
            }
        }

        // Filter by date range
        if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);
            end.setHours(23, 59, 59, 999); // Include the entire end date

            data = data.filter(inv => {
                const invDate = new Date(inv.invoiceDate);
                return invDate >= start && invDate <= end;
            });
        }

        setFilteredInvoices(data);
    }, [selectedEmployee, dateRange, invoices, employees]);

    // Compute totals with safe defaults
    const totalEmployees = employees.length;
    const totalOrders = filteredInvoices.length;
    const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const totalCustomers = new Set(filteredInvoices.map(inv => inv.customerContact).filter(Boolean)).size;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const completionRate = invoices.length > 0 ? (filteredInvoices.length / invoices.length) * 100 : 0;

    // 🔥 Compute top performing employees
    useEffect(() => {
        const employeePerformance = {};

        filteredInvoices.forEach(inv => {
            if (!employeePerformance[inv.employeeId]) {
                employeePerformance[inv.employeeId] = {
                    employeeId: inv.employeeId,
                    employeeName: inv.employeeName || 'Unknown',
                    totalSales: 0,
                    orderCount: 0,
                    avgOrderValue: 0,
                    customerSatisfaction: Math.random() * 20 + 80
                };
            }
            employeePerformance[inv.employeeId].totalSales += (inv.total || 0);
            employeePerformance[inv.employeeId].orderCount += 1;
        });

        Object.keys(employeePerformance).forEach(empId => {
            const emp = employeePerformance[empId];
            emp.avgOrderValue = emp.orderCount > 0 ? emp.totalSales / emp.orderCount : 0;
        });

        const sortedPerformance = Object.values(employeePerformance)
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 8);

        setTopEmployees(sortedPerformance);

        // Prepare radar data safely
        if (sortedPerformance.length > 0) {
            const maxSales = Math.max(...sortedPerformance.map(emp => emp.totalSales));
            const maxOrders = Math.max(...sortedPerformance.map(emp => emp.orderCount));
            const maxAvgOrder = Math.max(...sortedPerformance.map(emp => emp.avgOrderValue));

            const radarData = sortedPerformance.slice(0, 3).map(emp => ({
                subject: emp.employeeName,
                Sales: maxSales > 0 ? (emp.totalSales / maxSales) * 100 : 0,
                Orders: maxOrders > 0 ? (emp.orderCount / maxOrders) * 100 : 0,
                'Avg Order': maxAvgOrder > 0 ? (emp.avgOrderValue / maxAvgOrder) * 100 : 0,
                Satisfaction: emp.customerSatisfaction,
                fullMark: 100,
            }));
            setPerformanceRadar(radarData);
        }
    }, [filteredInvoices]);

    // Aggregate data for various charts
    useEffect(() => {
        const dishMap = {};
        const categoryMap = {};
        const hourlyMap = {};
        const customerMap = {};

        filteredInvoices.forEach(inv => {
            const dateObj = new Date(inv.invoiceDate);
            const hour = dateObj.getHours();

            // Hourly sales
            if (!hourlyMap[hour]) hourlyMap[hour] = 0;
            hourlyMap[hour] += (inv.total || 0);

            // Customer metrics
            if (inv.customerContact) {
                if (!customerMap[inv.customerContact]) {
                    customerMap[inv.customerContact] = { orders: 0, totalSpent: 0 };
                }
                customerMap[inv.customerContact].orders += 1;
                customerMap[inv.customerContact].totalSpent += (inv.total || 0);
            }

            // Safely process items
            if (inv.items && Array.isArray(inv.items)) {
                inv.items.forEach(item => {
                    // Top dishes
                    const itemName = item.itemName || item.name || 'Unknown Item';
                    if (!dishMap[itemName]) dishMap[itemName] = 0;
                    dishMap[itemName] += (item.quantity || 0);

                    // Category sales
                    const category = item.category || 'Uncategorized';
                    if (!categoryMap[category]) {
                        categoryMap[category] = 0;
                    }
                    categoryMap[category] += (item.price || 0) * (item.quantity || 0);
                });
            }
        });

        // Top dishes
        const sortedDishes = Object.entries(dishMap)
            .map(([name, quantity]) => ({ name, quantity, sales: quantity * 250 }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10);

        // Categories
        const sortedCategories = Object.entries(categoryMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        // Hourly sales
        const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
            hour: `${hour}:00`,
            sales: hourlyMap[hour] || 0,
            orders: filteredInvoices.filter(inv => new Date(inv.invoiceDate).getHours() === hour).length
        }));

        // Customer metrics with safe defaults
        const customerStats = Object.values(customerMap);
        const customerMetricsData = {
            avgOrdersPerCustomer: customerStats.length > 0 ?
                customerStats.reduce((sum, cust) => sum + cust.orders, 0) / customerStats.length : 0,
            avgCustomerValue: customerStats.length > 0 ?
                customerStats.reduce((sum, cust) => sum + cust.totalSpent, 0) / customerStats.length : 0,
            repeatCustomers: customerStats.filter(cust => cust.orders > 1).length
        };

        setTopDishes(sortedDishes);
        setCategorySales(sortedCategories);
        setHourlySales(hourlyData);
        setCustomerMetrics(customerMetricsData);
    }, [filteredInvoices]);

    // Aggregate sales for chart and revenue trend
    useEffect(() => {
        const aggregateSales = () => {
            const map = {};
            const trendMap = {};

            filteredInvoices.forEach(inv => {
                const dateObj = new Date(inv.invoiceDate);

                // Skip invalid dates
                if (isNaN(dateObj.getTime())) {
                    console.warn('Invalid date found:', inv.invoiceDate);
                    return;
                }

                let key;

                if (salesPeriod === "daily") {
                    key = dateObj.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    });
                } else if (salesPeriod === "weekly") {
                    const startOfWeek = new Date(dateObj);
                    startOfWeek.setDate(dateObj.getDate() - dateObj.getDay());
                    key = `Week ${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()}`;
                } else if (salesPeriod === "monthly") {
                    key = dateObj.toLocaleString('default', {
                        month: 'long',
                        year: 'numeric'
                    });
                } else if (salesPeriod === "yearly") {
                    key = `${dateObj.getFullYear()}`;
                }

                if (!map[key]) map[key] = { total: 0, orders: 0 };
                map[key].total += (inv.total || 0);
                map[key].orders += 1;

                // For trend line - use ISO string for consistent parsing
                const trendKey = dateObj.toISOString().split('T')[0];
                if (!trendMap[trendKey]) trendMap[trendKey] = 0;
                trendMap[trendKey] += (inv.total || 0);
            });

            const trendData = Object.entries(trendMap)
                .map(([date, total]) => ({
                    date: new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    total
                }))
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .reduce((acc, curr, index) => {
                    const cumulativeTotal = index === 0 ? curr.total : acc[index - 1].cumulative + curr.total;
                    return [...acc, { ...curr, cumulative: cumulativeTotal }];
                }, []);

            setRevenueTrend(trendData);

            // Sort the sales data chronologically
            const sortedSalesData = Object.entries(map)
                .map(([period, data]) => ({
                    period,
                    total: data.total,
                    orders: data.orders
                }))
                .sort((a, b) => {
                    // Custom sorting logic based on period type
                    if (salesPeriod === "daily" || salesPeriod === "monthly") {
                        return new Date(a.period) - new Date(b.period);
                    }
                    return a.period.localeCompare(b.period);
                });

            return sortedSalesData;
        };
        setSalesData(aggregateSales());
    }, [filteredInvoices, salesPeriod]);

    // Custom tooltip formatter
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="tooltip-item" style={{ color: entry.color }}>
                            {entry.name}: {entry.name.includes('Sales') || entry.name.includes('Revenue') ?
                                `₹${(entry.value || 0).toFixed(2)}` : (entry.value || 0)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedEmployee("");
        setDateRange({ start: "", end: "" });
    };

    // Get active filter count
    const activeFilterCount = (selectedEmployee ? 1 : 0) + (dateRange.start ? 1 : 0) + (dateRange.end ? 1 : 0);

    if (loading) {
        return (
            <div className="manager-dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="manager-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">Restaurant Analytics Dashboard</h1>
                <p className="dashboard-subtitle">Real-time insights with advanced filtering</p>
            </div>

            {/* Enhanced Filters Section */}
            <div className="filters-section">
                <div className="filters-header">
                    <h3 className="filters-title">🔍 Filter Analytics</h3>
                    {activeFilterCount > 0 && (
                        <button onClick={clearFilters} className="clear-filters-btn">
                            🗑️ Clear Filters ({activeFilterCount})
                        </button>
                    )}
                </div>
                <div className="filter-group">
                    <div className="filter-item">
                        <label className="filter-label">👤 Employee Name</label>
                        <select
                            className="filter-select"
                            value={selectedEmployee}
                            onChange={e => setSelectedEmployee(e.target.value)}
                        >
                            <option value="">All Employees</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName || ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">📅 Start Date</label>
                        <input
                            type="date"
                            className="filter-input"
                            value={dateRange.start}
                            onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            max={dateRange.end || undefined}
                        />
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">📅 End Date</label>
                        <input
                            type="date"
                            className="filter-input"
                            value={dateRange.end}
                            onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            min={dateRange.start || undefined}
                        />
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">📊 Results</label>
                        <div className="results-count">
                            <strong>{filteredInvoices.length}</strong> orders found
                            {selectedEmployee && (
                                <span className="filter-indicator">
                                    👤 {employees.find(emp => emp.id === selectedEmployee)?.firstName}
                                </span>
                            )}
                            {(dateRange.start || dateRange.end) && (
                                <span className="filter-indicator">
                                    📅 {dateRange.start || 'Start'} to {dateRange.end || 'End'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="quick-stats-bar">
                <div className="quick-stat">
                    <div className="quick-stat-icon">💰</div>
                    <div className="quick-stat-info">
                        <span className="quick-stat-value">₹{(totalRevenue || 0).toFixed(2)}</span>
                        <span className="quick-stat-label">Total Revenue</span>
                    </div>
                </div>
                <div className="quick-stat">
                    <div className="quick-stat-icon">📦</div>
                    <div className="quick-stat-info">
                        <span className="quick-stat-value">{totalOrders}</span>
                        <span className="quick-stat-label">Total Orders</span>
                    </div>
                </div>
                <div className="quick-stat">
                    <div className="quick-stat-icon">👥</div>
                    <div className="quick-stat-info">
                        <span className="quick-stat-value">{totalCustomers}</span>
                        <span className="quick-stat-label">Unique Customers</span>
                    </div>
                </div>
                <div className="quick-stat">
                    <div className="quick-stat-icon">⭐</div>
                    <div className="quick-stat-info">
                        <span className="quick-stat-value">₹{(avgOrderValue || 0).toFixed(2)}</span>
                        <span className="quick-stat-label">Avg Order Value</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Sales Performance - Full Width */}
                <div className="dashboard-card full-width">
                    <div className="card-header">
                        <h2 className="card-title">📈 Sales Performance Overview</h2>
                        <div className="card-actions">
                            <div className="period-buttons">
                                {["daily", "weekly", "monthly", "yearly"].map(period => (
                                    <button
                                        key={period}
                                        className={`period-btn ${salesPeriod === period ? "active" : ""}`}
                                        onClick={() => setSalesPeriod(period)}
                                    >
                                        {period.charAt(0).toUpperCase() + period.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={salesData}>
                                <defs>
                                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffd700" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ffd700" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                <XAxis dataKey="period" stroke="#b8b8b8" />
                                <YAxis yAxisId="left" stroke="#b8b8b8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#b8b8b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="total" fill="url(#salesGradient)" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#4ade80" strokeWidth={3} dot={false} name="Orders" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Trend & Hourly Sales */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">📊 Revenue Trend</h2>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={revenueTrend}>
                                <defs>
                                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                <XAxis dataKey="date" stroke="#b8b8b8" />
                                <YAxis stroke="#b8b8b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="cumulative" stroke="#4ade80" fill="url(#trendGradient)" name="Cumulative Revenue (₹)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">🕒 Peak Hours Analysis</h2>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={hourlySales}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                <XAxis dataKey="hour" stroke="#b8b8b8" />
                                <YAxis stroke="#b8b8b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="sales" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Sales (₹)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Employee Performance Radar & Top Performers */}
                {performanceRadar.length > 0 && (
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">🎯 Employee Performance Radar</h2>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart data={performanceRadar}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Sales Performance" dataKey="Sales" stroke="#ffd700" fill="#ffd700" fillOpacity={0.6} />
                                    <Radar name="Order Efficiency" dataKey="Orders" stroke="#4ade80" fill="#4ade80" fillOpacity={0.6} />
                                    <Legend />
                                    <Tooltip content={<CustomTooltip />} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {topEmployees.length > 0 && (
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">🏆 Top Performers</h2>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topEmployees.slice(0, 5)} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                                    <XAxis type="number" stroke="#b8b8b8" />
                                    <YAxis
                                        type="category"
                                        dataKey="employeeName"
                                        stroke="#b8b8b8"
                                        width={80}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="totalSales" fill="#ffd700" radius={[0, 4, 4, 0]} name="Sales (₹)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Enhanced Category Distribution */}
                {categorySales.length > 0 && (
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">📈 Category Revenue Stack</h2>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={categorySales.slice(0, 6)}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                >
                                    <defs>
                                        {COLORS.map((color, index) => (
                                            <linearGradient key={index} id={`stackGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#b8b8b8"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        tick={{ fontSize: 11 }}
                                    />
                                    <YAxis
                                        stroke="#b8b8b8"
                                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`₹${(value || 0).toFixed(2)}`, 'Revenue']}
                                        contentStyle={{
                                            background: 'rgba(26, 26, 26, 0.95)',
                                            border: '1px solid rgba(255, 215, 0, 0.3)',
                                            borderRadius: '12px',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[4, 4, 0, 0]}
                                        animationDuration={1500}
                                    >
                                        {categorySales.slice(0, 6).map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={`url(#stackGradient${index})`}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Top Dishes Leaderboard */}
                {topDishes.length > 0 && (
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">🍕 Popular Dishes Leaderboard</h2>
                        </div>
                        <div className="dishes-leaderboard">
                            {topDishes.map((dish, index) => (
                                <div key={dish.name} className="leaderboard-item">
                                    <div className="leaderboard-rank">
                                        <span className={`rank-badge rank-${index + 1}`}>#{index + 1}</span>
                                    </div>
                                    <div className="leaderboard-info">
                                        <span className="dish-name">{dish.name}</span>
                                        <span className="dish-stats">{dish.quantity} orders</span>
                                    </div>
                                    <div className="leaderboard-progress">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${(dish.quantity / (topDishes[0]?.quantity || 1)) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}



            </div>
        </div>
    );
}