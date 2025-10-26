import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

export default function TaskTrendChart({ tasks }) {
  // Step 1: Aggregate data — count concurrent active tasks per day
  const dateCount = {}

  tasks.forEach(task => {
    if (!task.createdAt) return
    const start = new Date(task.createdAt)
    const end = task.closedAt ? new Date(task.closedAt) : new Date()
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0]
      dateCount[key] = (dateCount[key] || 0) + 1
    }
  })

  // Step 2: Convert to sorted array for chart
  const data = Object.entries(dateCount)
    .map(([date, count]) => ({ date, active: count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
