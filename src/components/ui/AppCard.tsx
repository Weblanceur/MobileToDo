import React from 'react'
import {StyleSheet, View} from "react-native"

const AppCard = (props: any) => {
    return (
        <View style={ {...styles.default, ...props.style} }>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 6,
    }
})

export default AppCard