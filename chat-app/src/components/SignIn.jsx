import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {signIn,fetchUser} from '../slices/userSlice'
import {useNavigate} from 'react-router'
import './components.css'

export default function SignIn() {

  const navigate=useNavigate();
    const dispatch=useDispatch();
    // const{users} =useSelector((state)=>state.user)
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    useEffect(()=>{
  dispatch(fetchUser());
},[])
  return (
    
   <div className="auth-container">
  <div className="auth-box">
    <h1>Sign In</h1>

    <input className="auth-input" type="text" placeholder="email"
      onChange={(e)=>setEmail(e.target.value)} />

    <input className="auth-input" type="text" placeholder="password"
      onChange={(e)=>setPassword(e.target.value)} />

    <button className="auth-btn"
      onClick={() => {
        dispatch(signIn({ email, password }));
        navigate("/home");
      }}>
      Sign In
    </button>
  </div>
</div>

  )
}
