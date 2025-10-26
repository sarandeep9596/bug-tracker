export const initialState = {
  tasks: [],
  timelogs: []
}

export function taskReducer(state, action){
  switch(action.type){
    case 'INIT': return action.payload
    case 'ADD_TASK':
      return {...state, tasks: [action.payload, ...state.tasks]}
    case 'UPDATE_TASK':
      return {...state, tasks: state.tasks.map(t=> t.id===action.payload.id? {...t, ...action.payload} : t)}
    case 'DELETE_TASK':
      return {...state, tasks: state.tasks.filter(t=> t.id!==action.payload)}
    case 'START_TIMER':
      return {...state, timelogs: [...state.timelogs, action.payload]}
    case 'STOP_TIMER':
      return {...state, timelogs: state.timelogs.map(l=> l.id===action.payload.id? {...l, end: action.payload.end, duration: action.payload.duration} : l)}
    default:
      return state
  }
}
