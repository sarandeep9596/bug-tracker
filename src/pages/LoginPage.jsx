import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './LoginPage.css'

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('dev@example.com')
  const [password, setPassword] = useState('123')
  const [err, setErr] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const ok = login(email, password)
    if (!ok) setErr('Invalid credentials')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={submit} className="login-form">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {err && <div className="error-msg">{err}</div>}

          <button className="login-btn" type="submit">Login</button>
        </form>

        <p className="demo-text">
          Demo users: <b>dev@example.com / 123</b> — <b>mgr@example.com / 456</b>
        </p>
         
      </div>
      <img src="./signup-clouds.svg" alt="clouds" className="clouds" />
    </div>
  )
}
