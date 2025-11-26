import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ role }) => {
    const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

    // Not logged in → go to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role → block (no cross-redirect)
    if (role && currentUser.role !== role) {
        return <Navigate to="/" replace />; // Just go to front or error page
    }

    return <Outlet />;
};

export default PrivateRoute;
