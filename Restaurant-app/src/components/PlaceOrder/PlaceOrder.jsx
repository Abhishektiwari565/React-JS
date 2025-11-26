import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import {
    fetchOrders,
    createEmptyOrder,
    patchOrder,
    deleteOrder,
    selectOrder
} from "../../slices/OrderSlice";
import InvoiceModal from "../InvoiceModal/InvoiceModal";
import "./PlaceOrder.css";

export default function PlaceOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector(s => s.orders);
    const { currentUser: user } = useSelector(s => s.auth);
    const [localEdits, setLocalEdits] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const visibleOrders = orders.filter(order => order.employeeId === user.id);

    const handleAddCustomer = async () => {
        const newOrder = await dispatch(createEmptyOrder({
            employeeId: user.id,
            employeeName: user.firstName
        })).unwrap();
        dispatch(selectOrder(newOrder.id));
        navigate("/employee-dashboard/menu");
    };

    const handleFieldChange = (orderId, field, value) => {
        setLocalEdits(prev => ({
            ...prev,
            [orderId]: { ...(prev[orderId] || {}), [field]: value }
        }));
    };

    const saveOrderFields = async (order) => {
        const edits = localEdits[order.id] || {};
        const patch = {};
        ["customerName", "customerContact", "customerAddress", "tableNo", "paymentMode", "status"].forEach(f => {
            if (edits[f] !== undefined) patch[f] = edits[f];
        });
        if (Object.keys(patch).length === 0) return;
        await dispatch(patchOrder({ id: order.id, patch })).unwrap();
        setLocalEdits(prev => {
            const copy = { ...prev };
            delete copy[order.id];
            return copy;
        });
    };

    const calculateTotals = (items) => {
        const subtotal = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
        const serviceCharge = +(subtotal * 0.05).toFixed(2);
        const gst = +((subtotal + serviceCharge) * 0.05).toFixed(2);
        const total = +(subtotal + serviceCharge + gst).toFixed(2);
        return { subtotal, serviceCharge, gst, total };
    };

    const changeItemQty = async (order, itemId, delta) => {
        const items = order.items.map(it =>
            it.itemId === itemId || it.id === itemId
                ? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) }
                : it
        );
        const totals = calculateTotals(items);
        await dispatch(patchOrder({ id: order.id, patch: { items, ...totals } })).unwrap();
    };

    const removeItemFromOrder = async (order, itemId) => {
        const items = order.items.filter(it => !(it.itemId === itemId || it.id === itemId));
        const totals = calculateTotals(items);
        await dispatch(patchOrder({ id: order.id, patch: { items, ...totals } })).unwrap();
    };

    const handleGenerateBill = async (order) => {
        // Validate required fields before generating bill
        if (!order.customerName?.trim()) {
            alert("❌ Please enter customer name before generating bill!");
            return;
        }

        if (!order.customerContact?.trim()) {
            alert("❌ Please enter customer contact before generating bill!");
            return;
        }

        // Validate if order has items
        if (!order.items || order.items.length === 0) {
            alert("❌ Cannot generate bill for empty order! Please add items first.");
            return;
        }

        // Confirm before generating bill
        const confirmBill = window.confirm(
            `Generate bill for ${order.customerName || `Order #${order.id}`}?\n\n` +
            `Total Amount: ₹${(order.total || 0).toFixed(2)}\n` +
            `Items: ${order.items.length}\n\n` +
            `This will move the order to invoices and update sales records.`
        );

        if (!confirmBill) return;

        try {
            // Save any pending edits first
            await saveOrderFields(order);

            // Recalculate totals to ensure accuracy
            const totals = calculateTotals(order.items || []);

            // Create enhanced invoice with branding
            const invoice = {
                ...order,
                ...totals,
                invoiceNumber: `INV-${Date.now()}-${order.id}`,
                invoiceDate: new Date().toLocaleString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }),
                employeeName: user.firstName,
                employeeId: user.id,
                status: "completed",
                paymentStatus: order.paymentMode === "Cash" ? "paid" : "pending",
                // Branding information
                restaurantLogo: "https://cdn5.f-cdn.com/contestentries/1510474/33623865/5cf041ec517d5_thumb900.jpg", // Replace with your actual logo URL
                restaurantName: "Signature", // Replace with your restaurant name
                tagline: "Where Taste Becomes Art", // Replace with your tagline

                address: "123 Food Street, City, State - 123456", // Replace with your address
                phone: "+91 9876543210", // Replace with your phone

                // Styling for invoice
                invoiceStyle: {
                    fontColor: "#000000", // Black font
                    accentColor: "#ffd700", // Gold accent for headers
                    backgroundColor: "#ffffff" // White background
                }
            };

            // Show loading state
            const originalText = "🧾 Generating Bill...";
            const generateBtn = document.querySelector('.generate-bill-btn');
            if (generateBtn) {
                generateBtn.disabled = true;
                generateBtn.textContent = "⏳ Generating...";
            }

            // Save invoice to database
            await axios.post("http://localhost:3000/invoices", invoice);

            // Update employee sales statistics
            const empRes = await axios.get(`http://localhost:3000/employees/${user.id}`);
            const employee = empRes.data;

            await axios.patch(`http://localhost:3000/employees/${user.id}`, {
                totalOrders: (employee.totalOrders || 0) + 1,
                totalSales: (employee.totalSales || 0) + totals.total,
                lastOrderDate: new Date().toISOString()
            });

            // Remove the original order
            await dispatch(deleteOrder(order.id)).unwrap();

            // Show success message
            alert(`✅ Bill generated successfully!\n\n` +
                `Customer: ${order.customerName}\n` +
                `Invoice: ${invoice.invoiceNumber}\n` +
                `Total: ₹${totals.total.toFixed(2)}`);

            // Open enhanced invoice modal
            setSelectedOrder(invoice);

        } catch (err) {
            console.error("Error generating bill:", err);

            if (err.response?.status === 404) {
                alert("❌ Employee not found! Please contact administrator.");
            } else if (err.response?.status === 500) {
                alert("❌ Server error! Please try again.");
            } else {
                alert("❌ Failed to generate bill! Please check your connection and try again.");
            }

            const generateBtn = document.querySelector('.generate-bill-btn');
            if (generateBtn) {
                generateBtn.disabled = false;
                generateBtn.textContent = "🧾 Generate Bill";
            }
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Delete this order?")) return;
        try {
            await dispatch(deleteOrder(orderId)).unwrap();
            alert("✅ Order deleted successfully!");
        } catch (err) {
            console.error("Error deleting order:", err);
            alert("❌ Failed to delete order!");
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="place-order-container">
            <div className="place-order-header">
                <h2 className="place-order-title">🧾 Manage Your Orders</h2>
                <div className="place-order-buttons">
                    <button onClick={handleAddCustomer} className="add-customer-btn">
                        ➕ Add Customer
                    </button>
                    <button onClick={() => navigate("/employee-dashboard/menu")} className="menu-btn">
                        Go to Menu
                    </button>
                </div>
            </div>

            <div className="orders-list">
                {visibleOrders.length === 0 && (
                    <div className="no-orders">
                        <p>No active orders.</p>
                    </div>
                )}

                {visibleOrders.map(order => {
                    const local = localEdits[order.id] || {};
                    return (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <h3 className="customer-name">
                                    {order.customerName || `Order #${order.id}`}
                                </h3>
                                <div className="order-actions">
                                    <button
                                        onClick={() => {
                                            dispatch(selectOrder(order.id));
                                            navigate("/employee-dashboard/menu");
                                        }}
                                        className="add-product-btn"
                                    >
                                        ➕ Add Product
                                    </button>
                                    <button
                                        onClick={() => handleDeleteOrder(order.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleGenerateBill(order)}
                                        className="generate-bill-btn"
                                    >
                                        🧾 Generate Bill
                                    </button>
                                </div>
                            </div>

                            <div className="order-form-grid">
                                <input
                                    placeholder="Customer Name"
                                    value={local.customerName ?? order.customerName ?? ""}
                                    onChange={(e) => handleFieldChange(order.id, "customerName", e.target.value)}
                                    onBlur={() => saveOrderFields(order)}
                                    className="order-input"
                                />
                                <input
                                    placeholder="Contact"
                                    value={local.customerContact ?? order.customerContact ?? ""}
                                    onChange={(e) => handleFieldChange(order.id, "customerContact", e.target.value)}
                                    onBlur={() => saveOrderFields(order)}
                                    className="order-input"
                                />
                                <input
                                    placeholder="Address"
                                    value={local.customerAddress ?? order.customerAddress ?? ""}
                                    onChange={(e) => handleFieldChange(order.id, "customerAddress", e.target.value)}
                                    onBlur={() => saveOrderFields(order)}
                                    className="order-input"
                                />
                                <input
                                    placeholder="Table No"
                                    value={local.tableNo ?? order.tableNo ?? ""}
                                    onChange={(e) => handleFieldChange(order.id, "tableNo", e.target.value)}
                                    onBlur={() => saveOrderFields(order)}
                                    className="order-input"
                                />
                                <select
                                    value={local.paymentMode ?? order.paymentMode ?? "Cash"}
                                    onChange={(e) => handleFieldChange(order.id, "paymentMode", e.target.value)}
                                    onBlur={() => saveOrderFields(order)}
                                    className="order-select"
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Card</option>
                                </select>
                                <select
                                    value={local.status ?? order.status ?? "Pending"}
                                    onChange={(e) => handleFieldChange(order.id, "status", e.target.value)}
                                    onBlur={() => saveOrderFields(order)}
                                    className="order-select"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Served">Served</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {order.items?.length > 0 && (
                                <div className="order-items">
                                    {order.items.map(it => (
                                        <div key={it.id || it.itemId} className="order-item">
                                            <div className="item-info">
                                                {it.image && (
                                                    <img
                                                        src={it.image}
                                                        alt={it.itemName || it.name}
                                                        className="item-image"
                                                    />
                                                )}
                                                <div className="item-details">
                                                    <strong className="item-title">
                                                        {it.itemName || it.name}
                                                    </strong>
                                                    <div className="item-calculation">
                                                        ₹{it.price} × {it.quantity} = ₹{(it.price * it.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-controls">
                                                <button
                                                    onClick={() => changeItemQty(order, it.itemId || it.id, 1)}
                                                    className="quantity-btn"
                                                >
                                                    ➕
                                                </button>
                                                <button
                                                    onClick={() => changeItemQty(order, it.itemId || it.id, -1)}
                                                    className="quantity-btn"
                                                >
                                                    ➖
                                                </button>
                                                <button
                                                    onClick={() => removeItemFromOrder(order, it.itemId || it.id)}
                                                    className="remove-btn"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>₹{(order.subtotal || 0).toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Service Charge (5%):</span>
                                    <span>₹{(order.serviceCharge || 0).toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>GST (5%):</span>
                                    <span>₹{(order.gst || 0).toFixed(2)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>₹{(order.total || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedOrder && <InvoiceModal order={selectedOrder} onClose={handleCloseModal} />}
        </div>
    );
}