import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Brand / About */}
          <div className="col-md-4 mb-4">
            <h3 className="fw-bold">🍽️ FoodieHub</h3>
            <p className="text-muted">
              Bringing you authentic flavors and unforgettable dining
              experiences. Taste the love in every bite.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#menu" className="text-white text-decoration-none">Menu</a></li>
              <li><a href="#gallery" className="text-white text-decoration-none">Gallery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="mb-1">📍 123 Food Street, New Delhi, India</p>
            <p className="mb-1">📞 +91 98765 43210</p>
            <p className="mb-3">✉️ foodiehub@example.com</p>
            
            {/* Social Icons */}
            <div>
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
      </div>
    </footer>
  );
}
