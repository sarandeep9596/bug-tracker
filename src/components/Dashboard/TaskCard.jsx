import React, { useContext } from 'react'
import { TaskContext } from '../../context/TaskContext'
import { AuthContext } from '../../context/AuthContext'
import TimeTracker from '../Timer/TimeTracker'
import './TaskCard.css'

export default function TaskCard({ task }) {
  const { dispatch } = useContext(TaskContext)
  const { user } = useContext(AuthContext)

  const del = () => dispatch({ type: 'DELETE_TASK', payload: task.id })
  const requestClose = () =>
    dispatch({
      type: 'UPDATE_TASK',
      payload: { id: task.id, status: 'Pending Approval' },
    })
  const approveClose = () =>
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        id: task.id,
        status: 'Closed',
        closedAt: new Date().toISOString().split('T')[0],
      },
    })
  const reopenTask = () =>
    dispatch({
      type: 'UPDATE_TASK',
      payload: { id: task.id, status: 'Reopened', closedAt: null },
    })

  const role = (user?.role || '').toLowerCase()

  return (
    <div className="task-card">
      {/* Header */}
      <div className="task-header">
        <div>
          <h4 className="task-title">{task.title}</h4>
          {task.project && (
            <p className="task-project">Project: {task.project}</p>
          )}
        </div>
        <div className="task-meta-right">
          <span className={`task-priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="task-status">{task.status}</span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      {/* Info Row */}
      <div className="task-info">
        <span>👤 {task.assigneeId}</span>
        {task.startDate && <span>🕒 {task.startDate}</span>}
        {task.dueDate && <span>📅 {task.dueDate}</span>}
      </div>

      {/* Footer */}
      <div className="task-footer">
        <TimeTracker task={task} />

        {role === 'developer' && (
          <>
            <button className="btn small" onClick={requestClose}>
              Request Close
            </button>
            <button className="btn small danger" onClick={del}>
              Delete
            </button>
          </>
        )}

        {role === 'manager' && (
          <>
            <button className="btn small" onClick={approveClose}>
              Approve Close
            </button>
            <button className="btn small" onClick={reopenTask}>
              Reopen
            </button>
          </>
        )}
      </div>
    </div>
  )
}
