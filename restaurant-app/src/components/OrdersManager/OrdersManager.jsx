// src/components/OrdersInvoicesManager/OrdersInvoicesManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersManager.css";

export default function OrdersManager() {
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState("orders"); // "orders" or "invoices"

    // Search states
    const [idSearch, setIdSearch] = useState("");
    const [customerSearch, setCustomerSearch] = useState("");
    const [dateSearch, setDateSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Fetch orders and invoices
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersRes = await axios.get("http://localhost:3000/orders");
                const invoicesRes = await axios.get("http://localhost:3000/invoices");
                setOrders(ordersRes.data);
                setInvoices(invoicesRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    // Function to filter & deduplicate data
    const handleSearch = (data) => {
        let filtered = [...data];

        if (statusFilter) {
            filtered = filtered.filter(
                (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (idSearch) {
            filtered = filtered.filter(
                (item) => item.id.toLowerCase() === idSearch.toLowerCase()
            );
        }

        if (customerSearch) {
            filtered = filtered.filter(
                (item) =>
                    item.customerName &&
                    item.customerName.toLowerCase().includes(customerSearch.toLowerCase())
            );
        }

        if (dateSearch) {
            filtered = filtered.filter(
                (item) =>
                    (item.date && item.date.toLowerCase().includes(dateSearch.toLowerCase())) ||
                    (item.invoiceDate && item.invoiceDate.toLowerCase().includes(dateSearch.toLowerCase()))
            );
        }

        // Deduplicate by ID
        filtered = Array.from(new Map(filtered.map((item) => [item.id, item])).values());

        return filtered;
    };

    const displayedOrders = handleSearch(orders);
    const displayedInvoices = handleSearch(invoices);

    // Render table
    const renderTable = (data) => (
        <div className="table-container">
            <table className="orders-invoices-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Customer</th>
                        <th>Table</th>
                        <th>Items</th>
                        <th>Total (₹)</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="no-data">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="table-row">
                                <td className="id-cell">{item.id}</td>
                                <td className="employee-cell">{item.employeeName || "-"}</td>
                                <td className="customer-cell">{item.customerName || "-"}</td>
                                <td className="table-cell">{item.tableNo || "-"}</td>
                                <td className="items-cell">
                                    {item.items
                                        .map((it) => `${it.itemName} x${it.quantity}`)
                                        .join(", ")}
                                </td>
                                <td className="total-cell">₹{item.total.toFixed(2)}</td>
                                <td className={`status ${item.status.toLowerCase()}`}>
                                    {item.status}
                                </td>
                                <td className="payment-cell">{item.paymentMethod || item.paymentMode || "-"}</td>
                                <td className="date-cell">{item.date || item.invoiceDate || "-"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="orders-invoices-wrapper">
            {/* Header Section */}
            <div className="page-header">
                <h1 className="page-title">Orders & Invoices Manager</h1>
                <p className="page-subtitle">Manage and track all restaurant orders and invoices</p>
            </div>

            {/* Tabs Section */}
            <div className="tabs-section">
                <div className="tabs-container">
                    <button
                        className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        Orders ({orders.length})
                    </button>
                    <button
                        className={`tab-button ${activeTab === "invoices" ? "active" : ""}`}
                        onClick={() => setActiveTab("invoices")}
                    >
                        Invoices ({invoices.length})
                    </button>
                </div>
            </div>

            {/* Search & Filters Section */}
            <div className="filters-section">
                <div className="filters-container">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="Search by ID"
                            className="search-input"
                            value={idSearch}
                            onChange={(e) => setIdSearch(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Search by Customer"
                            className="search-input"
                            value={customerSearch}
                            onChange={(e) => setCustomerSearch(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Search by Date"
                            className="search-input"
                            value={dateSearch}
                            onChange={(e) => setDateSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Served">Served</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="content-section">
                {activeTab === "orders"
                    ? renderTable(displayedOrders)
                    : renderTable(displayedInvoices)}
            </div>
        </div>
    );
}