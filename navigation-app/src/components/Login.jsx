import React from 'react'
import { replace, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    return (
        <div>
            <input type="email" placeholder='enter email' />
            <input type="password" placeholder='enter password' />
            <button onClick={() => {
                navigate("/login", { replace: true });
            }}>Submit</button>
        </div>
    )
}
