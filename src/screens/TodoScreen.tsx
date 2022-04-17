import React from 'react'
import {StyleSheet, Text, View, Button} from "react-native"
import {THEME} from "../theme"
import AppCard from "../components/ui/AppCard"

export const TodoScreen = ({goBack, todo, onRemove}: any) => {
    return (
        <View>
            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title='Ред.' onPress={() => console.log('pressed')} />
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title='Назад' color={THEME.GREY_COLOR} onPress={goBack}/>
                </View>
                <View style={styles.button}>
                    <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
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
        width: '40%',
    },
})