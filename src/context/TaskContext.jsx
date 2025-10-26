import React, { createContext, useReducer, useEffect } from 'react'
import { taskReducer, initialState } from './TaskReducer'
import demo from '../data/demoData.json'

export const TaskContext = createContext()

export const TaskProvider = ({children})=>{
  const [state, dispatch] = useReducer(taskReducer, initialState, (init)=>{
    const raw = localStorage.getItem('tasksData')
    if(raw) return JSON.parse(raw)
    // first load: use demo
    localStorage.setItem('tasksData', JSON.stringify(demo))
    return demo
  })

  useEffect(()=>{
    localStorage.setItem('tasksData', JSON.stringify(state))
  },[state])

  return <TaskContext.Provider value={{state,dispatch}}>{children}</TaskContext.Provider>
}
