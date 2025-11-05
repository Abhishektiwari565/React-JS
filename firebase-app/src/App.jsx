
import { useState } from 'react'
import './App.css'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from './firebase'

function App() {
  const [email,setEmail]=useState("");
  const [password,setPassword ]=useState("");

  const handleSignup=()=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((()=>
      alert("signUp successfully !! ")))
    .catch((error)=>alert(error.message))
  }

  const handleSignIn=()=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user=userCredential.user;
      alert("SignIn successfully  !!"+" "+user.email);
    })
    .catch((error)=>alert(error.message));
  }
  return (
    <>
    <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
    <input type="text" placeholder='password'  onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={handleSignup}>Sign Up</button>
    <button onClick={handleSignIn}>Sign In</button>
    </>
  )
}

export default App
