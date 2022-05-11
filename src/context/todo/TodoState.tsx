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
import { Http } from '../../http'

const TodoState = ({ children }: any) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const { changeScreen }: any = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async (title: string) => {
    clearError()
    showLoader()
    try {
      const data = await Http.post('https://todo-12209-default-rtdb.europe-west1.firebasedatabase.app/todos.json', { title })
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch (e) {
      console.log(e)
      showError('Что-то пошло не так....')
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id: string, title: string) => {
    clearError()
    showLoader()
    try {
      await Http.patch(`https://todo-12209-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, { title })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      console.log(e)
      showError('Что-то пошло не так....')
    } finally {
      hideLoader()
    }
  }

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
          onPress: async () => {
            await Http.delete(`https://todo-12209-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`)
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
      const data = await Http.get('https://todo-12209-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))

      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      console.log(e)
      showError('Что-то пошло не так....')
    } finally {
      hideLoader()
    }
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