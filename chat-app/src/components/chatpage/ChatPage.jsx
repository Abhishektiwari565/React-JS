import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './chat-style.css'
import { sendMessage, readMessages, deleteMessage, updateMessage } from '../../slices/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../slices/userSlice'

export default function ChatPage() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { chats } = useSelector((state) => state.chats);

  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState("");

  const location = useLocation();
  const receiver = location.state || {};

  useEffect(() => {
  if (currentUser?.email && receiver?.email) {
    dispatch(getUser());
    dispatch(readMessages({ sender: currentUser.email, receiver: receiver.email }));
  }
}, []);

  const handleSendOrUpdate = async () => {
  if (editId) {
    await dispatch(updateMessage({
      sender: currentUser.email,
      receiver: receiver.email,
      chatId: editId,
      newMessage: message
    }));
  } else {
    await dispatch(sendMessage({
      message,
      sender: currentUser.email,
      receiver: receiver.email
    }));
  }

  setEditId("");
  setMessage("");

  dispatch(readMessages({ sender: currentUser.email, receiver: receiver.email }));
};

  const handleDeleteMessage = (chat) => {
  if (chat.sender !== currentUser.email) {
    alert("You can delete only your own messages!");
    return;
  }

  dispatch(deleteMessage({
    sender: currentUser.email,
    receiver: receiver.email,
    chatId: chat.chatId
  }));
};


  const startEditing = (chat) => {
    if(chat.sender!=currentUser.email){
      alert("only update your own message")
      return
    }
    setEditId(chat.chatId);
    setMessage(chat.message);
  };

  return (
    <div className="chat-view">
      <div className="chat-page">
        <h3>User: {receiver?.email}</h3>

        <div>
          {chats.map((chat, i) => {
            const position = chat.sender === currentUser.email
              ? "message-end"
              : "message-start";

            return (
              <div
                key={i}
                className={`message-div ${position}`}
                onClick={() => startEditing(chat)}         
                onDoubleClick={() => handleDeleteMessage(chat)} 
              >
                <span className="message-box">{chat.message}</span>
              </div>
            );
          })}
        </div>

        <div className="input-area">
          <input
            type="text" placeholder='enter text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={handleSendOrUpdate}>
            {editId ? "Update" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
