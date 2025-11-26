import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

// -------------------
// Async Thunks
// -------------------

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
    const response = await axios.get("http://localhost:3000/orders");
    // Filter out empty items and duplicates by ID
    const uniqueOrders = [...new Map(response.data.filter(o => o.items?.length > 0).map(o => [o.id, o])).values()];
    return uniqueOrders;
});

// Fetch all invoices
export const fetchInvoices = createAsyncThunk("orders/fetchInvoices", async () => {
    const response = await axios.get("http://localhost:3000/invoices");
    const uniqueInvoices = [...new Map(response.data.filter(inv => inv.items?.length > 0).map(inv => [inv.id, inv])).values()];
    return uniqueInvoices;
});

// Create a new empty order
export const createEmptyOrder = createAsyncThunk(
    "orders/createEmptyOrder",
    async ({ employeeId, employeeName }) => {
        const newOrder = {
            employeeId,
            employeeName,
            customerName: "",
            customerContact: "",
            customerAddress: "",
            tableNo: "",
            paymentMode: "Cash",
            status: "Pending",
            items: [],
            subtotal: 0,
            gst: 0,
            discount: 0,
            total: 0,
        };
        const response = await axios.post("http://localhost:3000/orders", newOrder);
        return response.data;
    }
);

// Update an order
export const patchOrder = createAsyncThunk("orders/patchOrder", async ({ id, patch }) => {
    const response = await axios.patch(`http://localhost:3000/orders/${id}`, patch);
    return response.data;
});

// Delete an order
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id) => {
    await axios.delete(`http://localhost:3000/orders/${id}`);
    return id;
});

// Finalize order (move to invoices)
export const finalizeOrder = createAsyncThunk(
    "orders/finalizeOrder",
    async ({ id, invoicePayload }) => {
        await axios.post("http://localhost:3000/invoices", invoicePayload);
        await axios.delete(`http://localhost:3000/orders/${id}`);
        return { orderId: id, invoice: invoicePayload };
    }
);

// -------------------
// Slice
// -------------------
const OrderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        invoices: [],
        selectedOrderId: null,
        status: "idle",
        error: null,
    },
    reducers: {
        selectOrder: (state, action) => {
            state.selectedOrderId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.invoices = action.payload;
            })
            .addCase(createEmptyOrder.fulfilled, (state, action) => {
                const exists = state.orders.find(o => o.id === action.payload.id);
                if (!exists) state.orders.push(action.payload);
            })
            .addCase(patchOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex((o) => o.id === action.payload.id);
                if (index !== -1) state.orders[index] = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((o) => o.id !== action.payload);
            })
            .addCase(finalizeOrder.fulfilled, (state, action) => {
                // Remove the order
                state.orders = state.orders.filter((o) => o.id !== action.payload.orderId);

                // Add invoice if not already present
                const exists = state.invoices.find(inv => inv.id === action.payload.invoice.id);
                if (!exists) state.invoices.push(action.payload.invoice);
            });
    },
});

// -------------------
// Memoized Selectors
// -------------------
export const selectOrders = (state) => state.orders.orders;

export const selectTopDishes = createSelector([selectOrders], (orders) => {
    const dishCount = {};
    orders.forEach((order) => {
        order.items.forEach((item) => {
            if (!dishCount[item.itemName]) dishCount[item.itemName] = 0;
            dishCount[item.itemName] += item.quantity;
        });
    });
    return Object.entries(dishCount).map(([name, count]) => ({ name, count }));
});

export const selectSalesTrend = createSelector([selectOrders], (orders) => {
    const salesByDate = {};
    orders.forEach((order) => {
        const date = new Date(order.date).toLocaleDateString();
        if (!salesByDate[date]) salesByDate[date] = 0;
        salesByDate[date] += order.total;
    });
    return Object.entries(salesByDate).map(([date, revenue]) => ({ date, revenue }));
});

// -------------------
// Exports
// -------------------
export const { selectOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
