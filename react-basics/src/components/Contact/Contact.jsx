import React, { useRef, useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [user,setUser]=useState({
    name: "",
    email: "",
    phone: "",
    subject: ""

  });
    // const name=useRef("");
    // const email=useRef("");
    // const number=useRef("");
    // const subject=useRef("")

    const handleInput=(e)=>{
      const key=e.target.name;
      const value=e.target.value;
      setUser({ ...user, [key]: value });
      // temp[key]=value;
      // setUser(temp);
    }
    const handleSubmit = () => {
    // console.log(name.current.value);
    //  console.log(email.current.value);
    //   console.log(number.current.value);
    //    console.log(subject.current.value);
    console.log(user);
    alert("Form submitted successfully");

};

  return (
    <div className='contact-detail'>
       <div className='contact'>
        <h1>Contact</h1>
         <input  value={user.name} onChange={handleInput} name='name'  type="text" placeholder='Enter your name...'  />
        <input value={user.email} onChange={handleInput} name='email' type="email" placeholder='Enter your email..' />
        <input value={user.phone} onChange={handleInput} type="tel" name='phone' placeholder='Enter your mobile number..' />
        <input value={user.subject} onChange={handleInput} type="text" name='subject' placeholder='Subject...'/>
        <button onClick={handleSubmit}>Submit</button>
       </div>
       <div className="output">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.subject}</p>
       </div>
    </div>  
  )
}
