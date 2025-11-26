import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top">
      <div className="container">

        <a className="navbar-brand fw-bold fs-3" href="#">
          🍽️ FoodieHub
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item"><a className="nav-link active fw-semibold" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link fw-semibold" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link fw-semibold" href="#menu">Menu</a></li>
            <li className="nav-item"><a className="nav-link fw-semibold" href="#gallery">Gallery</a></li>
            <li className="nav-item"><a className="nav-link fw-semibold" href="#contact">Contact</a></li>
          </ul>

          <form className="d-flex me-3">
            <input className="form-control me-2 rounded-pill" type="search" placeholder="Search..." aria-label="Search"/>
          </form>

          <a href="#reservation" className="btn btn-warning rounded-pill px-4 fw-bold">Book Now</a>
        </div>
      </div>
    </nav>
  )
}
