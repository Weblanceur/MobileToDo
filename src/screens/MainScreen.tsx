import React, {useState} from 'react'
import {FlatList, StyleSheet, View} from "react-native"
import {AddTodo} from "../components/AddTodo"
import { Todo } from '../components/Todo'

export const MainScreen = ({todos, addTodo, removeTodo, openTodo}: any) => {

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            <FlatList data={todos} keyExtractor={item => item.id} renderItem={({item}) => (
                <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
            )} />
        </View>
    )
}

const styles = StyleSheet.create({

})