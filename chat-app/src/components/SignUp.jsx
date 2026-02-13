import React, { useState } from 'react'
import {signUp} from '../slices/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import './components.css'

export default function SignUp() {
    const dispatch=useDispatch()
    const {users}=useSelector(state=>state.user)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (

<div className="auth-container">
  <div className="auth-box">
    <h3>Sign Up</h3>

    <input className="auth-input" type="text" placeholder="Enter Email"
      value={email} onChange={(e)=>setEmail(e.target.value)} />

    <input className="auth-input" type="password" placeholder="Enter Password"
      value={password} onChange={(e)=>setPassword(e.target.value)} />

    <button className="auth-btn"
      onClick={() => dispatch(signUp({ email, password }))}>
      Sign Up
    </button>
  </div>
</div>


  )
}
