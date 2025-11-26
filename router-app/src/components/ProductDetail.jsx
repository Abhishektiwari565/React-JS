import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductDetail() {
  const location=useLocation();
  const product=location.state;
  return (
    <div className='detail-box'>
        <h2>Detail Page</h2>
        <img src={product.image} alt="" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <h3>{product.price}</h3>
            <p>{product.category}</p>
    </div>
  )
}
