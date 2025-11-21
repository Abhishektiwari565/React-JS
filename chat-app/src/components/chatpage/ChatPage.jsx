import React, { useEffect } from 'react'
import {useLocation} from 'react-router'
import './chat-style.css'
import {sendMessage} from '../../slices/chatSlice'
import {useDispatch,useSelector} from 'react-redux'
import {getUser} from '../../slices/userSlice'

export default function ChatPage() {
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user)
    const location=useLocation();
    const receiver=location.state;

    useEffect(()=>{
      dispatch(getUser())
    },[])
    const HandleMessage=()=>{
      dispatch(sendMessage({sender:currentUser.email,receiver:receiver.email}))
    }
  return (
   <div className="chat-view">
  <div className="chat-page">
    <h3>User: {receiver.email}</h3>

    <div className="input-area">
      <input type="text" />
      <button onClick={HandleMessage}>Send</button>
    </div>
  </div>
</div>

  )
}
