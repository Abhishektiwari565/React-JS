import React, { useEffect, useState } from 'react'
import Home from './Home';
import { products } from '../json/Products';
import SignIn from './SignIn';

export default function PrivateRoute(cartList,setCartList) {
    const [user,setUser]=useState({});

    const getUser=()=>{
        const str = localStorage.getItem("user") ?? "{}";
        const res = JSON.parse(str);
        setUser(res);
    }

    useEffect(()=>{
        getUser()
    },[])
  return (
   user.email!=undefined ?
      <Home products={products} setCartList={setCartList}/>:<SignIn/>
  )
}
