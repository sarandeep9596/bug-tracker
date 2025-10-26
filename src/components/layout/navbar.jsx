import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './layout.css'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/fealtyx_logo.webp" alt="FaltyX Logo" className="navbar-logo" />
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
            alt="User"
            className="user-avatar"
          />
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
