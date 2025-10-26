import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'
import { AuthContext } from '../context/AuthContext'

export default function ManagerPage(){
  const { state, dispatch } = useContext(TaskContext)
  const { user, logout } = useContext(AuthContext)

  const approve = (id)=> dispatch({type:'UPDATE_TASK', payload:{id, status:'closed'}})
  const reopen = (id)=> dispatch({type:'UPDATE_TASK', payload:{id, status:'reopened'}})

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', marginBottom:12}}>
        <h1>Manager Panel — {user.name}</h1>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="card">
        <h3>All Tasks</h3>
        {state.tasks.map(t=>(
          <div key={t.id} className="task-row">
            <div>
              <strong>{t.title}</strong><div style={{fontSize:13,color:'#6b7280'}}>{t.description}</div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div className="badge">{t.status}</div>
              <button className="btn" onClick={()=>approve(t.id)}>Approve</button>
              <button onClick={()=>reopen(t.id)}>Re-open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
