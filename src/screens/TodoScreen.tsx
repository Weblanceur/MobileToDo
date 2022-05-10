import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {THEME} from "../theme"
import {FontAwesome,AntDesign} from "@expo/vector-icons"
import AppCard from "../components/ui/AppCard"
import EditModal from "../components/EditModal"
import AppTextBold from "../components/ui/AppTextBold"
import AppButton from '../components/ui/AppButton'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { Todo } from '../context/types'

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo}: any = useContext(TodoContext)
    const {todoId, changeScreen}: any = useContext(ScreenContext)
    const [modal, setModal] = useState<boolean>(false)

    const todo = todos.find((t: Todo) => t.id === todoId)

    const saveHandler = (title: string) => {
        updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                value={todo.title}
                modalVisible={modal}
                onCancel={() => setModal(false)}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
                        <AntDesign name='back' size={20} color='#fff' />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
                        <FontAwesome name='remove' size={20} />
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    card: {
        marginBottom: 20,
        padding: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: Dimensions.get('window').width / 3,
    },
})