import React, {useState} from 'react'
import { Alert, Keyboard, StyleSheet, TextInput, View } from 'react-native'
import {THEME} from "../theme"
import {AntDesign} from "@expo/vector-icons"

export const AddTodo = ({ onSubmit }: any) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Введите название')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Введите название...'
                autoCorrect={false}
                autoCapitalize='none'
            />
            <AntDesign.Button
                onPress={pressHandler}
                name='playcircleo'
            >
                Добавить
            </AntDesign.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '65%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
})