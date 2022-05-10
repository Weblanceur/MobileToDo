import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  State,
  Todo,
} from '../types'

const handlers: any = {
  [ADD_TODO]: (state: State, { title, id }: Todo) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title
      }
    ]
  }),
  [UPDATE_TODO]: (state: State, { id, title }: Todo) => ({
    ...state,
    todos: state.todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    })
  }),
  [REMOVE_TODO]: (state: State, { id }: Todo) => ({
    ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== id)
  }),
  [SHOW_LOADER]: (state: State) => ({...state, loading: true}),
  [HIDE_LOADER]: (state: State) => ({...state, loading: false}),
  [SHOW_ERROR]: (state: State, { error }: any) => ({...state, error}),
  [CLEAR_ERROR]: (state: State) => ({...state, error: null}),
  [FETCH_TODOS]: (state: State, { todos }: State) => ({ ...state, todos }),
  DEFAULT: (state: State) => state
}

export const todoReducer = (state: State, action: any) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}