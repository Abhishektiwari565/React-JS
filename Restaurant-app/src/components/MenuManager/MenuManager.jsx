import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu, deleteMenuItem } from "../../slices/MenuSlice";
import { useNavigate } from "react-router";
import "./MenuManager.css";

export default function MenuManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, status, error } = useSelector((state) => state.menu);

    const [categoryFilter, setCategoryFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => { dispatch(fetchMenu()); }, [dispatch]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this menu item?")) return;
        dispatch(deleteMenuItem(id));
    };

    const handleUpdate = (id) => navigate(`/manager-dashboard/modify-menu/${id}`);
    const handleAdd = () => navigate("/manager-dashboard/modify-menu");

    const categories = [...new Set(items?.map((item) => item.category) || [])];
    const filteredItems = items?.filter((item) => {
        const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
        const matchesAvailability = availabilityFilter === "" || item.availability === (availabilityFilter === "Available");
        const matchesSearch = item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) || item.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesAvailability && matchesSearch;
    }) || [];

    return (
        <div className="menu-manager-wrapper">
            {/* Header */}
            <div className="menu-manager-header">
                <h1 className="menu-manager-title">Menu Management</h1>
                <p className="menu-manager-subtitle">Manage your restaurant menu items</p>
            </div>

            {/* Controls */}
            <div className="controls-section">
                <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Items</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select>
                <button onClick={handleAdd} className="add-menu-btn">
                    <span className="btn-icon">➕</span> Add Menu Item
                </button>
            </div>

            {/* Status Messages */}
            {status === "loading" && (
                <div className="status-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading menu items...</p>
                </div>
            )}
            {status === "failed" && (
                <div className="status-error">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* Menu Grid */}
            {status === "succeeded" && (
                <div className="menu-grid menu-grid-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🍽️</div>
                            <h3>No menu items found</h3>
                            <p>Try adjusting your search or filters</p>
                            <button onClick={handleAdd} className="empty-state-btn">Add Your First Menu Item</button>
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <div key={item.id} className="menu-card card">
                                <div className="card-image-container">
                                    <img src={item.image || "/default-food.jpg"} alt={item.itemName} className="menu-image" />
                                    <div className={`availability-badge ${item.availability ? 'available' : 'not-available'}`}>
                                        {item.availability ? 'Available' : 'Not Available'}
                                    </div>
                                </div>

                                <div className="card-content">
                                    <div className="card-header">
                                        <h3 className="item-name">{item.itemName}</h3>
                                        <span className="item-price">₹{item.price}</span>
                                    </div>
                                    <p className="item-description">{item.description}</p>
                                    <div className="item-category">
                                        <span className="category-tag">{item.category}</span>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button onClick={() => handleUpdate(item.id)} className="btn-update">
                                        <span className="btn-icon">✏️</span> Update
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="btn-delete">
                                        <span className="btn-icon">🗑️</span> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
