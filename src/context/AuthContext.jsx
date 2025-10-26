import React, { createContext, useState, useEffect } from 'react'
import users from '../data/users.json'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
  const [user,setUser] = useState(null)
  useEffect(()=>{
    const raw = localStorage.getItem('authUser')
    if(raw) setUser(JSON.parse(raw))
  },[])
  const login = (email,password)=>{
    const found = users.find(u=>u.email===email && u.password===password)
    if(found){
      const safe = { id: found.id, name: found.name, email: found.email, role: found.role}
      localStorage.setItem('authUser', JSON.stringify(safe))
      setUser(safe)
      return true
    }
    return false
  }
  const logout = ()=>{
    localStorage.removeItem('authUser')
    setUser(null)
  }
  return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
}
