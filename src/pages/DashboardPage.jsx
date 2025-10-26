import React, { useContext, useState } from 'react'
import { TaskContext } from '../context/TaskContext'
import { AuthContext } from '../context/AuthContext'
import TaskList from '../components/Dashboard/TaskList'
import TaskForm from '../components/Dashboard/TaskForm'
import TaskTrendChart from '../components/Dashboard/TaskTrendChart'
import Navbar from '../components/layout/navbar'
import Sidebar from '../components/layout/sidebar'
import './DashboardPage.css'   // 👈 Import CSS

export default function DashboardPage() {
  const { state } = useContext(TaskContext)
  const { user } = useContext(AuthContext)
  const [showNew, setShowNew] = useState(false)

  const myTasks = state.tasks.filter((t) => t.assigneeId === user.id)

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="layout">
        <Sidebar onSelect={(page) => console.log('Navigate:', page)} />
        <main className="main-content">
          <div className="dashboard-header">
            <h1>Dashboard — {user.name}</h1>
            <button className="btn" onClick={() => setShowNew((s) => !s)}>
              {showNew ? 'Close' : 'New Task'}
            </button>
          </div>

          {showNew && (
            <div className="taskform-wrapper">
              <TaskForm onClose={() => setShowNew(false)} />
            </div>
          )}

          <div className="grid">
            <div className="column card">
              <h3>Your Tasks</h3>
              <TaskList tasks={myTasks} />
            </div>

            <div className="card stats-card">
              <h3>Quick Stats</h3>
              <p>Total tasks: {state.tasks.length}</p>
              <p>
                Total time logged:{' '}
                {state.timelogs.reduce((s, l) => s + (l.duration || 0), 0) / 3600} hrs
              </p>
              <h3 className="chart-title">Activity Trend</h3>
              <TaskTrendChart tasks={state.tasks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
