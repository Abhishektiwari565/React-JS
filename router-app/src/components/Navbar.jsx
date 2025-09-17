import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const LogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }

  return (
    <nav className="navbar">
      <div className="logo">🛒 MyShop</div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/carts">Cart</Link>
        <button onClick={LogoutUser}>Log Out</button>
      </div>
    </nav>
  )
}
