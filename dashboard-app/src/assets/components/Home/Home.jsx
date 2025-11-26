import { useState } from "react";
import "./Home.css";
import { data } from "../../data.js";  
import HeroSection from "../HeroSection/HeroSection.jsx";

export default function Home() {
    const [order, setOrder] = useState("");
  const [customer,setCustomer]=useState("");
  const [product,setProduct]=useState("");
  const [payment,setPayment]=useState("");
  const [status,setStatus]=useState("");
  const [filteredData, setFilteredData] = useState(data);
  // const [date,setDate]=useState("");
 

const handleClearBtn=()=>{
  setOrder("");
  setCustomer("");
  setPayment("");
  setProduct("");
  setStatus("")
}

 const handleSearch = () => {
    let result = [...data]; // start fresh

    if (order) {
      result = result.filter((item) =>
        item.orderId.toLowerCase().includes(order.toLowerCase())
      );
    }

    if (customer) {
      result = result.filter((item) =>
        item.customer.toLowerCase().includes(customer.toLowerCase())
      );
    }

    if (product) {
      result = result.filter((item) =>
        item.product.toLowerCase().includes(product.toLowerCase())
      );
    }

    if (payment) {
      result = result.filter(
        (item) => item.payment.toLowerCase() === payment.toLowerCase()
      );
    }

    if (status) {
      result = result.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredData(result); // ✅ update state so table re-renders
  };


  return (
    <div className="main">
      <div className="input-section">
        <div className="input-group">
          <h6>Order ID</h6>
          <input
            type="text"
            value={order}
            placeholder="Order ID"
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>

        <div className="input-group">
          <h6>Customer</h6>
          <input type="text" placeholder="First and Last name" value={customer} onChange={(e)=>setCustomer(e.target.value)} />
        </div>

        <div className="input-group">
          <h6>Product</h6>
          <input type="text" placeholder="Ollivander Wand" value={product} onChange={(e)=>setProduct(e.target.value)}/>
        </div>

        <div className="input-group">
          <h6>Payment</h6>
          <select value={payment} onChange={(e)=>setPayment(e.target.value)}>
            <option value="select">Select</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="input-group">
          <h6>Status</h6>
          <select value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="status">Status</option>
            <option value="new">New</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="input-group">
          <h6>Date</h6>
          <input type="date" />
        </div>

        <div className="btn">
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClearBtn}>Clear filters</button>
        </div>
      </div>

      <HeroSection data={filteredData} />
    </div>
  );
}
