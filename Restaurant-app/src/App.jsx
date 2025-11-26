import { BrowserRouter as Router, Routes, Route } from "react-router";
import Front from "./components/Front/Front";
import Login from "./components/Login/Login";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/login" element={<Login />} />

        {/* Manager Protected Route */}
        <Route element={<PrivateRoute role="manager" />}>
          <Route path="/manager-dashboard/*" element={<ManagerDashboard />} />
        </Route>

        {/* Employee Protected Route */}
        <Route element={<PrivateRoute role="employee" />}>
          <Route path="/employee-dashboard/*" element={<EmployeeDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
