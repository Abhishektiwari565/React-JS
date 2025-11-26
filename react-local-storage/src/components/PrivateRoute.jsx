import React, { useEffect, useState } from 'react'
import SignIn from './SignIn';

export default function PrivateRoute({children}) {
    const [user,setUser]=useState({});

    const getUser=()=>{
        const get=JSON.parse(localStorage.getItem("user"))
        setUser(get);
    }

    useEffect(()=>{
        getUser();
    },[])
 
  if(!user){
    return <SignIn/>
  }
  return children;
}
