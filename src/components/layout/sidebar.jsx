import React from 'react'
import './layout.css'
import { Home, ListTodo, BarChart3, Settings } from 'lucide-react'

export default function Sidebar({ onSelect }) {
  const menu = [
    { name: 'Dashboard', icon: <Home size={18} />, key: 'dashboard' },
    { name: 'Tasks', icon: <ListTodo size={18} />, key: 'tasks' },
    { name: 'Reports', icon: <BarChart3 size={18} />, key: 'reports' },
    { name: 'Settings', icon: <Settings size={18} />, key: 'settings' },
  ]

  return (
    <aside className="sidebar">
      {menu.map((item) => (
        <button key={item.key} className="sidebar-item" onClick={() => onSelect(item.key)}>
          {item.icon}
          <span>{item.name}</span>
        </button>
      ))}
    </aside>
  )
}
