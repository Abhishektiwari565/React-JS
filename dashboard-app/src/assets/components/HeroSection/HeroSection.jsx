import React from "react";
import './HeroSection.css'

export default function HeroSection({ data }) {
  return (
    <div className="main">
      <div className="data-table">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.length > 0 ? (
              data.map((product, index) => (
                <tr key={index}>
                  <td>{product.orderId}</td>
                  <td>{product.date}</td>
                  <td>{product.customer}</td>
                  <td>{product.product}</td>
                  <td>{product.price || "-"}</td>
                  <td>{product.payment}</td>
                  <td>{product.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
