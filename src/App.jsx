import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

export default function App(){
  return (
    <AuthProvider>
      <TaskProvider>
        <Main />
      </TaskProvider>
    </AuthProvider>
  )
}

function Main(){
  // simple routing by auth user presence & role switch
  return <AppRouter />
}

import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import ManagerPage from './pages/ManagerPage'

function AppRouter(){
  const { user } = useContext(AuthContext)
  if(!user) return <LoginPage />
  if(user.role === 'manager') return <ManagerPage />
  return <DashboardPage />
}
