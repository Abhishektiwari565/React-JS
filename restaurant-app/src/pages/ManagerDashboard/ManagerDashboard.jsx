import React from 'react'
import NavbarManager from '../../components/NavbarManager/NavbarManager'
import DashboardManager from '../../components/DashboardManager/DashboardManager'
import EmployeeManager from '../../components/EmployeeManager/EmployeeManager'
import MenuManager from '../../components/MenuManager/MenuManager'
import { Routes, Route } from "react-router"
import OrdersManager from '../../components/OrdersManager/OrdersManager'
import ProfileManager from '../../components/profileManager/ProfileManager'
import AddUpdateEmployees from '../../components/AddUpdateEmployees/AddUpdateEmployees'
import AddUpdateMenu from '../../components/AddUpdateMenu/AddUpdateMenu'

export default function ManagerDashboard() {
    return (
        <div>
            <NavbarManager />
            <Routes>
                <Route path="/" element={<DashboardManager />} />
                <Route path="/employees" element={<EmployeeManager />} />
                <Route path="/menus" element={<MenuManager />} />
                <Route path="/orders" element={<OrdersManager />} />
                <Route path="/profile" element={<ProfileManager />} />
                <Route path="/modify-employee" element={<AddUpdateEmployees />} />
                <Route path="/modify-employee/:id" element={<AddUpdateEmployees />} />
                <Route path="/modify-menu" element={<AddUpdateMenu />} />
                <Route path="/modify-menu/:id" element={<AddUpdateMenu />} />
            </Routes>
        </div>
    )
}
