import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../context/TaskContext'
import { AuthContext } from '../../context/AuthContext'

export default function TimeTracker({ task }) {
  const { state, dispatch } = useContext(TaskContext)
  const { user } = useContext(AuthContext)
  const [elapsed, setElapsed] = useState(0)

  // Active log for current user (developer)
  const activeLog = state.timelogs.find(
    (l) => l.taskId === task.id && !l.end && l.userId === user.id
  )

  // Total time for this task (sum of all durations)
  const totalSeconds = state.timelogs
    .filter((l) => l.taskId === task.id)
    .reduce((sum, l) => sum + (l.duration || 0), 0)

  // Live update of timer when active
  useEffect(() => {
    let interval
    if (activeLog) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - new Date(activeLog.start)) / 1000))
      }, 1000)
    } else {
      setElapsed(0)
    }
    return () => clearInterval(interval)
  }, [activeLog])

  const start = () => {
    const log = {
      id: 'log-' + Date.now(),
      taskId: task.id,
      userId: user.id,
      start: new Date().toISOString(),
    }
    dispatch({ type: 'START_TIMER', payload: log })
  }

  const stop = () => {
    if (!activeLog) return
    const end = new Date().toISOString()
    const duration = Math.round((new Date(end) - new Date(activeLog.start)) / 1000)
    dispatch({ type: 'STOP_TIMER', payload: { id: activeLog.id, end, duration } })
  }

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${h}h ${m}m ${s}s`
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Timer buttons for developers */}
      {user.role === 'developer' && (
        <>
          {activeLog ? (
            <button className="btn" onClick={stop}>
              ⏹ Stop ({formatTime(elapsed)})
            </button>
          ) : (
            <button className="btn" onClick={start}>
              ▶ Start
            </button>
          )}
        </>
      )}

      {/* Always show total time for task */}
      <span style={{ fontSize: 13, color: '#4b5563' }}>
        Total: {formatTime(totalSeconds + (activeLog ? elapsed : 0))}
      </span>
    </div>
  )
}
