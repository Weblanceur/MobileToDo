import React, {useState} from "react"
import {Alert, StyleSheet, View} from 'react-native'
import { Navbar } from "./src/components/Navbar"
import {MainScreen} from "./src/screens/MainScreen"
import {TodoScreen} from "./src/screens/TodoScreen"

interface Todo {
  id: string
  title: string
}

export default function App() {
  const [todoId, setTodoId] = useState<string | null >(null)
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (title: string) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title
    }])
  }

  const removeTodo = (id: string) => {
    const todo = todos.find((todo: Todo) => todo.id === id)
    if (todo) {
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
                setTodoId(null)
                setTodos(prev => prev.filter(todo => todo.id !== id))
              }
            },
          ],
          {
            cancelable: false,
          }
      )
    }
  }

  let content = (
      <MainScreen
          todos={todos}
          addTodo={addTodo}
          removeTodo={removeTodo}
          openTodo={setTodoId}
      />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen onRemove={removeTodo} goBack={() => setTodoId(null)} todo={selectedTodo} />
  }

  return (
    <View>
      <Navbar title="Todo App!"/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
})
