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
    <div>
      <input type="text" ref={emailRef} />
      <input type="text" ref={passwordRef}/>
      <button onClick={HandleSignIn}>Sign In</button>
    </div>
  )
}
