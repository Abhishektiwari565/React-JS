import React from 'react'
import {useLocation} from 'react-router'
import './chat-style.css'

export default function ChatPage() {
    const location=useLocation();
    const receiver=location.state;
  return (
   <div className="chat-view">
  <div className="chat-page">
    <h3>User: {receiver.email}</h3>

    <div className="input-area">
      <input type="text" />
      <button>Send</button>
    </div>
  </div>
</div>

  )
}
