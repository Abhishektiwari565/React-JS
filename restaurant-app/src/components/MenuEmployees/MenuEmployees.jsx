import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    fetchOrders,
    patchOrder,
    createEmptyOrder,
    selectOrder
} from "../../slices/OrderSlice";
import "./MenuEmployee.css";

export default function MenuEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, selectedOrderId } = useSelector(s => s.orders);
    const { currentUser: user } = useSelector(s => s.auth);

    const [menu, setMenu] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [localEdits, setLocalEdits] = useState({});
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3000/menu")
            .then(r => {
                setMenu(r.data);
                setIsLoaded(true);
                const uniqueCategories = ["All", ...new Set(r.data.map(item => item.category).filter(Boolean))];
                setCategoryList(uniqueCategories);
            })
            .catch(console.error);

        dispatch(fetchOrders());
    }, [dispatch]);

    const selectedOrder = orders.find(o => o.id === selectedOrderId && o.employeeId === user.id);

    // Fixed filteredMenu: unique items by itemId + category filter + search
    const filteredMenu = Array.from(new Set(menu.map(item => item.itemId)))
        .map(id => menu.find(item => item.itemId === id))
        .filter(item =>
            item.itemName.toLowerCase().includes(search.toLowerCase()) &&
            (category === "All" || (item.category && item.category === category))
        );

    const handleFieldChange = (field, value) => {
        setLocalEdits(prev => ({ ...prev, [field]: value }));
    };

    const saveOrderFields = async (order) => {
        const patch = {};
        ["customerName", "customerContact", "customerAddress", "tableNo", "paymentMode", "status"].forEach(f => {
            if (localEdits[f] !== undefined) patch[f] = localEdits[f];
        });
        if (Object.keys(patch).length === 0) return;
        await dispatch(patchOrder({ id: order.id, patch }));
        setLocalEdits({});
    };

    const handleAddToOrder = async (item) => {
        let order = selectedOrder;
        if (!order) {
            try {
                const newOrder = await dispatch(createEmptyOrder({
                    employeeId: user.id,
                    employeeName: user.firstName
                })).unwrap();
                dispatch(selectOrder(newOrder.id));
                order = { ...newOrder, items: newOrder.items || [] };
            } catch (err) {
                console.error("Error creating new order:", err);
                return;
            }
        }

        const existing = order.items.find(it => String(it.itemId) === String(item.itemId) || it.id === item.id);
        const newItems = existing
            ? order.items.map(it =>
                (String(it.itemId) === String(item.itemId) || it.id === item.id)
                    ? { ...it, quantity: (it.quantity || 1) + 1 }
                    : it
            )
            : [...order.items, { ...item, quantity: 1 }];

        const subtotal = newItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = newItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;

        await dispatch(patchOrder({ id: order.id, patch: { items: newItems, subtotal, gst, discount, total } }));
    };

    const changeItemQty = async (itemId, delta) => {
        if (!selectedOrder) return;

        const items = selectedOrder.items.map(it =>
            it.itemId === itemId || it.id === itemId
                ? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) }
                : it
        );

        const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;

        await dispatch(patchOrder({ id: selectedOrder.id, patch: { items, subtotal, gst, discount, total } }));
    };

    const removeItem = async (itemId) => {
        if (!selectedOrder) return;
        const items = selectedOrder.items.filter(it => !(it.itemId === itemId || it.id === itemId));
        const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;
        await dispatch(patchOrder({ id: selectedOrder.id, patch: { items, subtotal, gst, discount, total } }));
    };

    const handlePlaceOrder = async () => {
        if (!selectedOrder) {
            alert("No order selected.");
            return;
        }

        const currentData = {
            customerName: localEdits.customerName ?? selectedOrder.customerName,
            customerContact: localEdits.customerContact ?? selectedOrder.customerContact,
            customerAddress: localEdits.customerAddress ?? selectedOrder.customerAddress,
            tableNo: localEdits.tableNo ?? selectedOrder.tableNo,
            paymentMode: localEdits.paymentMode ?? selectedOrder.paymentMode,
            status: localEdits.status ?? selectedOrder.status,
        };

        const newErrors = {};

        for (const [key, value] of Object.entries(currentData)) {
            if (!value || value.toString().trim() === "") newErrors[key] = true;
        }

        if (currentData.customerContact && currentData.customerContact.toString().length !== 10) {
            newErrors.customerContact = true;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Please fill all required fields correctly.");
            return;
        }

        setErrors({});
        await saveOrderFields(selectedOrder);
        alert("Order placed successfully!");
        dispatch(selectOrder(null));
        setLocalEdits({});
        navigate("/employee-dashboard/order");
    };

    return (
        <div className={`menu-container ${isLoaded ? "loaded" : ""}`}>
            <div className="menu-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            <div className="menu-content">
                <div className="menu-header">
                    <h1 className="menu-title">🍽️ Restaurant Menu</h1>
                    <p className="menu-subtitle">Browse our exquisite selection of culinary delights</p>
                </div>

                <div className="menu-layout">
                    {/* Menu Section */}
                    <div className="menu-section">
                        <div className="search-box">
                            <i className="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="category-buttons">
                            {categoryList.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-btn ${category === cat ? "active" : ""}`}
                                    onClick={() => setCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="menu-grid">
                            {filteredMenu.map(item => (
                                <div key={item.itemId || item.id} className="menu-card">
                                    <div className="menu-card-image">
                                        <img src={item.image} alt={item.itemName} />
                                    </div>
                                    <div className="menu-card-content">
                                        <h3 className="item-name">{item.itemName}</h3>
                                        <p className="item-price">₹{item.price}</p>
                                        <button
                                            onClick={() => handleAddToOrder(item)}
                                            className="add-to-order-btn"
                                        >
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Sidebar */}
                    <div className="order-sidebar">
                        <div className="order-header">
                            <h3>🧾 Current Order</h3>
                            {selectedOrder && <span className="order-id">#{selectedOrder.id}</span>}
                        </div>

                        {!selectedOrder ? (
                            <div className="empty-order">
                                <div className="empty-order-icon">🛒</div>
                                <p>Adding items will create a new order automatically.</p>
                            </div>
                        ) : (
                            <>
                                <div className="order-details-form">
                                    <div className="form-grid">
                                        <input
                                            type="text"
                                            placeholder="Customer Name"
                                            value={localEdits.customerName || selectedOrder.customerName || ""}
                                            onChange={e => handleFieldChange("customerName", e.target.value)}
                                            className="order-input"
                                        />
                                        <input
                                            type="tel"
                                            maxLength="10"
                                            placeholder="Contact"
                                            value={localEdits.customerContact || selectedOrder.customerContact || ""}
                                            onChange={e => {
                                                const value = e.target.value.replace(/[^0-9]/g, "");
                                                handleFieldChange("customerContact", value);
                                            }}
                                            className="order-input"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={localEdits.customerAddress || selectedOrder.customerAddress || ""}
                                            onChange={e => handleFieldChange("customerAddress", e.target.value)}
                                            className="order-input full-width"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Table No"
                                            value={localEdits.tableNo || selectedOrder.tableNo || ""}
                                            onChange={e => handleFieldChange("tableNo", e.target.value)}
                                            className="order-input"
                                        />
                                        <select
                                            value={localEdits.paymentMode || selectedOrder.paymentMode || "cash"}
                                            onChange={e => handleFieldChange("paymentMode", e.target.value)}
                                            className="order-select"
                                        >
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="card">Card</option>
                                        </select>
                                        <select
                                            value={localEdits.status || selectedOrder.status || "pending"}
                                            onChange={e => handleFieldChange("status", e.target.value)}
                                            className="order-select"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="served">Served</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {selectedOrder.items?.length === 0 ? (
                                        <div className="empty-items">No items yet.</div>
                                    ) : (
                                        <div className="items-list">
                                            {selectedOrder.items.map(it => (
                                                <div key={it.id || it.itemId} className="order-item">
                                                    <div className="item-info">
                                                        <img src={it.image} alt={it.itemName} className="item-image" />
                                                        <div className="item-details">
                                                            <strong className="item-title">{it.itemName}</strong>
                                                            <div className="item-calculation">
                                                                ₹{it.price} × {it.quantity} = ₹{(it.price * it.quantity).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item-controls">
                                                        <button onClick={() => changeItemQty(it.itemId || it.id, 1)} className="control-btn add">➕</button>
                                                        <button onClick={() => changeItemQty(it.itemId || it.id, -1)} className="control-btn remove">➖</button>
                                                        <button onClick={() => removeItem(it.itemId || it.id)} className="control-btn delete">❌</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Subtotal:</span>
                                        <span>₹{selectedOrder.subtotal?.toFixed(2) || 0}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>GST:</span>
                                        <span>₹{selectedOrder.gst?.toFixed(2) || 0}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Discount:</span>
                                        <span>₹{selectedOrder.discount?.toFixed(2) || 0}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total:</span>
                                        <span>₹{selectedOrder.total?.toFixed(2) || 0}</span>
                                    </div>
                                </div>

                                <button className="place-order-btn" onClick={handlePlaceOrder}>
                                    ✅ Place Order
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}