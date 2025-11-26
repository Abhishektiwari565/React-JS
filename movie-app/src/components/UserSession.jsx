import React, { useState, useEffect } from "react";

export default function UserSession() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUser = sessionStorage.getItem("username");
    if (savedUser) setUsername(savedUser);
  }, []);

  const handleSave = () => {
    sessionStorage.setItem("username", username);
    alert("User saved in Session Storage!");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter your name"
        className="form-control mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn btn-info w-100" onClick={handleSave}>
        Save User
      </button>
      {username && <p className="mt-2">👤 Current User: <b>{username}</b></p>}
    </div>
  );
}