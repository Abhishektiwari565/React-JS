import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router'
import './chat-style.css'
import {sendMessage,readMessages} from '../../slices/chatSlice'
import {useDispatch,useSelector} from 'react-redux'
import {getUser,getCurrentUser} from '../../slices/userSlice'

export default function ChatPage() {
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user);
   const {chats}=useSelector((state)=>state.chats);
   const [message,setMessage]=useState("")
    const location=useLocation();
    const receiver=location.state;

    useEffect(()=>{
      dispatch(getCurrentUser());
      dispatch(getUser())
      dispatch(readMessages({sender:currentUser.email,receiver:receiver.email}))
    },[])

    const HandleMessage=()=>{
      dispatch(sendMessage({message:message,sender:currentUser.email,receiver:receiver.email}))
    }
  return (
   <div className="chat-view">
  <div className="chat-page">
    <h3>User: {receiver.email}</h3>
    <div>
      {
        chats.map((chat,i)=><p key={i}>{chat.message}</p>)
      }
    </div>

    <div className="input-area">
      <input onChange={(e)=>setMessage(e.target.value)} type="text" />
      <button onClick={HandleMessage}>Send</button>
    </div>
  </div>
</div>

  )
}
