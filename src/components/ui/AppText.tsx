import React from 'react'
import { StyleSheet, Text } from "react-native"

const AppText = (props: any) => {
    return (
        <Text style={{...styles.default, ...props.style}}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'roboto-regular'
    }
})

export default AppText