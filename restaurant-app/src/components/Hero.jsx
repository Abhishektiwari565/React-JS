import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://picsum.photos/1920/1080?food')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold mb-3">Welcome to 🍽️ FoodieHub</h1>
        <p className="lead mb-4">
          Fresh Ingredients • Authentic Taste • Unforgettable Experience
        </p>
        <a
          href="#menu"
          className="btn btn-warning btn-lg rounded-pill px-4 fw-bold shadow"
        >
          Explore Menu
        </a>
      </div>
    </section>
  );
}
