// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import orderReducer from "../slices/OrderSlice";
import menuReducer from "../slices/MenuSlice"; // ✅ Add this
import employeeReducer from '../slices/EmployeeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        menu: menuReducer, // ✅ Add this
        employee: employeeReducer,
    },
});
