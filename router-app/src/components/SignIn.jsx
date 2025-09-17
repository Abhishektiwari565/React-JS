import React, { useEffect } from 'react'
import { useNavigate} from "react-router-dom";
import {useRef } from "react";

export default function SignIn() {
    const navigate=useNavigate();
    const emailRef=useRef("");
     const passwordRef=useRef("");
       
    const HandleSignIn=()=>{
         const email=emailRef.current.value;
        const password=passwordRef.current.value;

        if(email !="" && password!=""){
            localStorage.setItem("user",JSON.stringify({"email":email,"password":password}));
            navigate("/home",{replace:true});
        }
    }
   
  return (
  <div className="signin-container">
    <div className="signin-box">
      <h2>Sign In</h2>
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={HandleSignIn}>Sign In</button>
    </div>
  </div>
)

}
