import React, { useState, useContext } from 'react'
import { TaskContext } from '../../context/TaskContext'
import { AuthContext } from '../../context/AuthContext'
import './TaskForm.css'

export default function TaskForm({ onClose }) {
  const { dispatch } = useContext(TaskContext)
  const { user } = useContext(AuthContext)

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    assigneeId: user.id,
    project: '',
    startDate: '',
    dueDate: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString().split('T')[0],
      closedAt: null,
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create Task</h3>

        <form onSubmit={handleSubmit} className="taskform-grid">
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Task title"
            />
          </label>

          <label className="full-width">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Brief description"
            />
          </label>

          <div className="two-col">
            <label>
              Priority
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Pending Approval</option>
                <option>Closed</option>
              </select>
            </label>
          </div>

          <label>
            Assignee
            <select name="assigneeId" value={form.assigneeId} onChange={handleChange}>
              <option value={1}>Dev One</option>
              <option value={2}>Dev Two</option>
              <option value={3}>Manager</option>
            </select>
          </label>

          <div className="two-col">
            <label>
              Start Date
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </label>

            <label>
              Due Date
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            </label>
          </div>

          <label>
            Project
            <input
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="Optional"
            />
          </label>

          <div className="form-actions">
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
