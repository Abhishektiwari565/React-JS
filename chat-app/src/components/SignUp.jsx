import React, { useState } from 'react'
import {signUp} from '../slices/userSlice'
import {useDispatch,useSelector} from 'react-redux'

export default function SignUp() {
    const dispatch=useDispatch()
    const {users}=useSelector(state=>state.user)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div>
        <h3>Sign Up</h3>
        <div>
            {
                users.map((user,index)=><h2 key={index}>
                    {
                        user.email
                    }
                </h2>)
            }
        </div>
      <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <br />
      <input type="text" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <hr />
      <button onClick={()=>dispatch(signUp({email,password}))}>Sign Up</button>
    </div>
  )
}
