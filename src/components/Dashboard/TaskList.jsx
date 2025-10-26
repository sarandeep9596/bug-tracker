import React, { useState, useMemo } from 'react'
import TaskCard from './TaskCard'
import './TaskList.css'

export default function TaskList({ tasks }) {
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')
  const [sortBy, setSortBy] = useState('dateDesc')

  // 🧠 Filter + sort logic
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )

    if (filterPriority !== 'All')
      filtered = filtered.filter(t => t.priority === filterPriority)

    filtered.sort((a, b) => {
      if (sortBy === 'dateAsc') return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortBy === 'dateDesc') return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === 'priority') return a.priority.localeCompare(b.priority)
      return 0
    })

    return filtered
  }, [tasks, search, filterPriority, sortBy])

  // 🗂️ Group tasks by status
  const columns = {
    Open: filteredTasks.filter(t => t.status === 'Open'),
    'In Progress': filteredTasks.filter(t => t.status === 'In Progress'),
    'Pending Approval': filteredTasks.filter(t => t.status === 'Pending Approval'),
    Closed: filteredTasks.filter(t => t.status === 'Closed')
  }

  return (
    <div className="tasklist-wrapper">
      {/* 🔍 Filter Row */}
      <div className="task-filter-bar">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="filter-select"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="dateDesc">Newest</option>
          <option value="dateAsc">Oldest</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* 🧩 Kanban Grid */}
      <div className="kanban-grid">
        {Object.entries(columns).map(([status, items]) => (
          <div key={status} className="kanban-column">
            <h4 className="kanban-title">{status}</h4>
            {items.length === 0 ? (
              <p className="no-tasks">No tasks</p>
            ) : (
              items.map((t) => <TaskCard key={t.id} task={t} />)
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
