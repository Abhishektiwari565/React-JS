
import React, { useEffect, useState } from 'react'

export default function Cart({ cartList, setCartList }) {
  const [total,setTotal]=useState(0);
  const removeCartDetail = (index) => {
    const arr = [...cartList];
    arr.splice(index, 1);
    setCartList(arr);
  }

  
  const totalPrice=()=>{
    let sum=0;
    cartList.map((cart)=>{
      sum+=cart.price;

    })
    setTotal(sum);
  }

  useEffect(()=>{
    totalPrice()
  },[cartList])

  return (
    <>
    <div>
      <h1>Cart Box</h1>
{
        cartList.map((cart, index) =>
          <div key={index} className="cartDetail">
            <img src={cart.image} alt="" />
            <p>{cart.title}</p>
            <button onClick={() => removeCartDetail(index)}>Delete</button>
          </div>
        )
      }
    </div>

    <div className='Total-box'>Total:{total}</div>
    </>
  )
}
