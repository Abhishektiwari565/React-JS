import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="main">
      <div className="input-section">
        <div className="input-group">
          <h6>Order ID</h6>
          <input type="text" placeholder="Order ID" />
        </div>

        <div className="input-group">
          <h6>Customer</h6>
          <input type="text" placeholder="First and Last name" />
        </div>

        <div className="input-group">
          <h6>Phone Number</h6>
          <input type="text" placeholder="Phone Number" />
        </div>

        <div className="input-group">
          <h6>Product</h6>
          <input type="text" placeholder="Ollivander Wand" />
        </div>

        <div className="input-group">
          <h6>Payment</h6>
          <select>
            <option value="select">Select</option>
            <option value="cod">Cash On Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        <div className="input-group">
          <h6>Status</h6>
          <select>
            <option value="status">Status</option>
            <option value="all">All</option>
            <option value="New">New</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Date in its own grid cell */}
        <div className="input-group">
          <h6>Date</h6>
          <input type="date" />
        </div>

        {/* Buttons in their own grid cell */}
        <div className="btn">
          <button>Search</button>
          <button>Clear filters</button>
        </div>
      </div>
    </div>
  );
}
