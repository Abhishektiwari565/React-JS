// src/slices/EmployeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all employees
export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async () => {
        const response = await axios.get("http://localhost:3000/employees");
        return response.data;
    }
);

// Add a new employee
export const addEmployee = createAsyncThunk(
    "employee/addEmployee",
    async (employeeData) => {
        const response = await axios.post("http://localhost:3000/employees", employeeData);
        return response.data;
    }
);

// Update an existing employee
export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async ({ id, employeeData }) => {
        const response = await axios.patch(`http://localhost:3000/employees/${id}`, employeeData);
        return response.data;
    }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id) => {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        return id;
    }
);

const initialState = {
    list: [],
    status: "idle",
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchEmployees.pending, (state) => { state.status = "loading"; })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // Add
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            // Update
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.list.findIndex(emp => emp.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })
            // Delete
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.list = state.list.filter(emp => emp.id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
