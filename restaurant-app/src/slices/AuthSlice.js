import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ firstName, password }, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:3000/employees");
            // match username using firstName
            const user = res.data.find(
                (u) =>
                    u.firstName.toLowerCase() === firstName.toLowerCase() &&
                    u.password === password
            );

            if (!user) {
                return rejectWithValue("Invalid username or password");
            }

            return user;
        } catch (err) {
            return rejectWithValue("Server error");
        }
    }
);

// Initialize state from localStorage
const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear localStorage on logout
            localStorage.removeItem("currentUser");
            localStorage.removeItem("isAuthenticated");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.error = null;

                // Persist to localStorage
                localStorage.setItem("currentUser", JSON.stringify(action.payload));
                localStorage.setItem("isAuthenticated", "true");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
