import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, getUser } from '../slices/userSlice'
import { useNavigate } from 'react-router'
import './components.css'

export default function UserHomePage() {
    const navigate = useNavigate();
    let { users, currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(fetchUser());
    }, []);

    return (
        <div className="home-container">
            <div className="home-header">
                <h2>Welcome, <span>{currentUser.email}</span></h2>
            </div>
            <div className="users-wrapper">
                <h3 className="users-title">Available Users</h3>
                <ol className="users-list">
                    {users.map((user, index) => {
                        if (user.email !== currentUser.email) {
                            return (
                                <li
                                    key={index}
                                    onClick={() => navigate("/chat", { state: user })}
                                    className="user-item"
                                >
                                    <div className="user-info">
                                        <div className="user-email">{user.email}</div>
                                        <div className="user-status">Tap to chat</div>
                                    </div>
                                    <span className="user-badge">● Online</span>
                                </li>
                            );
                        }
                        return <></>;
                    })}
                </ol>
            </div>
        </div>
    );
}
