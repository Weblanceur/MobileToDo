import React, { useContext, useReducer } from 'react'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  Todo,
  UPDATE_TODO,
} from '../types'
import { ScreenContext } from '../screen/screenContext'
import { Alert } from 'react-native'

const TodoState = ({ children }: any) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const { changeScreen }: any = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async (title: string) => {
    const response = await fetch('https://todo-12209-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title })
    })

    const data = await response.json()
    console.log(data)
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

  const updateTodo = (id: string, title: string) => dispatch({ type: UPDATE_TODO, id, title })

  const removeTodo = (id: string) => {
    const todo = state.todos.find((t: Todo) => t.id === id)
    Alert.alert(
      "Удалить элемент",
      `Вы действительно собираетесь удалить элемент "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          }
        },
      ],
      {
        cancelable: false,
      }
    )
  }

  const fetchTodos = async () => {
    clearError()
    showLoader()
    try {
      const response = await fetch('https://todo-12209-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
        headers: {'Content-Type': 'application/json'}
      })

      const data = await response.json()
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))

      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      console.log(e)
      showError('Что-то пошло не так....')
    }
    hideLoader()
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = (error: string) => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        fetchTodos,
        addTodo,
        updateTodo,
        removeTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoState