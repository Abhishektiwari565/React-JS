import React from 'react'
import "./Middle.css"

export default function Middle() {
  return (
    <div className='main'>
      <div className="input-box">
        <input  type="text" placeholder='Search by order ID or customer' />
        <button><i class="ri-filter-3-line"></i> Filter</button>
        <button><i class="ri-upload-2-line"></i> Export</button>
        <button><i class="ri-add-line"></i> Add New</button>
      </div>
    </div>
  )
}
