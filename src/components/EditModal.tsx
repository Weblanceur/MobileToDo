import React, {useState} from 'react';
import {Modal, View, StyleSheet, Alert, TextInput, Button} from "react-native";
import {THEME} from "../theme";
import AppButton from './ui/AppButton'

const EditModal = ({value, modalVisible, onCancel, onSave}: any) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка', `Не менее 3 символов, введено: ${title.trim().length}`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={onCancel}
        >
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    style={styles.input}
                    placeholder="Введите название"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>Отменить</AppButton>
                    <AppButton onPress={() => saveHandler()}>Сохранить</AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '85%',
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default EditModal;