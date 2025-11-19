import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {signIn,fetchUser} from '../slices/userSlice'

export default function SignIn() {


    const dispatch=useDispatch();
    const{users} =useSelector((state)=>state.user)
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    useEffect(()=>{
  dispatch(fetchUser());
},[])
  return (
    
    <div>
        <div>
        {users.map((user,i)=><h2 key={i}>
           { user.email}
        </h2>)}
    </div>
      <input type="text" placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
      <input type="text" placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={()=>{
        dispatch(signIn({email,password}))
      }}>Sign In</button>
    </div>
  )
}
