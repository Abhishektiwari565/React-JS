
import { useState } from 'react'
import './App.css'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth'
import {auth, provider,db} from './firebase'
import {collection,addDoc,getDocs} from 'firebase/firestore'

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

  const handleGoogleSignIn=()=>{
    signInWithPopup(auth,provider)
    .then((result)=>{
      const user=result.user;
      console.log(user.displayName)
      console.log(user.email)
      console.log(user.photoURL)
      alert("Google signin successfully !!")
    })
    .catch((error)=>alert(error.message));
  }

  const handleAddData=()=>{
     addDoc(collection(db,"book"),{
      "name":"The owner",
      "author":"Wahab",
      "price":200
    }).then(()=>alert("data added successfully !!"))
    .catch((error)=>alert(error.message));
  }

  const handleGetData=async()=>{
     const querySnapshot=await getDocs(collection(db,"book"));
    querySnapshot.docs.forEach((doc)=>console.log(doc.data()))

  }
  return (
    <>
    <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
    <input type="text" placeholder='password'  onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={handleSignup}>Sign Up</button>
    <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    <div>
      <button onClick={handleAddData}>Add data</button>
      <button onClick={handleGetData}>Read data</button>
    </div>
    </>
  )
}

export default App
