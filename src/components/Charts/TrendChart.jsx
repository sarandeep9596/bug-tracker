import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrendChart({data}) {
  return (
    <div style={{width:'100%', height:260}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tasks" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
