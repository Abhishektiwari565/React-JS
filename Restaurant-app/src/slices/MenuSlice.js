import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all menu items
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
    const res = await axios.get("http://localhost:3000/menu");
    return res.data;
});

// Add a new menu item
export const addMenuItem = createAsyncThunk(
    "menu/addMenuItem",
    async (item) => {
        const res = await axios.post("http://localhost:3000/menu", item);
        return res.data;
    }
);

// Update menu item
export const updateMenuItem = createAsyncThunk(
    "menu/updateMenuItem",
    async ({ id, item }) => {
        const res = await axios.patch(`http://localhost:3000/menu/${id}`, item);
        return res.data;
    }
);

// Delete menu item
export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id) => {
        await axios.delete(`http://localhost:3000/menu/${id}`);
        return id;
    }
);

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        items: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchMenu.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(fetchMenu.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; state.error = null; })
            .addCase(fetchMenu.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })

            // Add
            .addCase(addMenuItem.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(addMenuItem.fulfilled, (state, action) => { state.status = "succeeded"; state.items.push(action.payload); state.error = null; })
            .addCase(addMenuItem.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })

            // Update
            .addCase(updateMenuItem.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(updateMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex((i) => i.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
                state.error = null;
            })
            .addCase(updateMenuItem.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })

            // Delete
            .addCase(deleteMenuItem.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(deleteMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter((i) => i.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteMenuItem.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; });
    },
});

export default menuSlice.reducer;
