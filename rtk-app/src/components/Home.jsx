import React, { useEffect } from 'react'
import {useDispatch,useSelector  } from "react-redux";
import { fetchProducts, insertProducts } from "../slices/productSlice";

export default function Home() {
    const dispatch=useDispatch();
    const {products}=useSelector(state=>state.product)

    useEffect(()=>{
        dispatch(fetchProducts());
    },[])
  return (
    <div>
      <button onClick={()=>{
        dispatch(insertProducts({
          title:"Mobile cahrger",
          price:1220
        }))
      }}>Insert</button>
      <div>
        {
            products.map((product,index)=><div key={index}>{product.id} - {product.title} - ₹{product.price}</div>)
        }
      </div>
    </div>
  )
}
