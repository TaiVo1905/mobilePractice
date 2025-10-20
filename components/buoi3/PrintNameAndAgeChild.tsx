import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Info {
    name: string;
    age: number;
}

export const PrintNameAndAgeChild = ({info, setInfo}: { info: Info; setInfo: (info: Info) => void }) => {
    return (
        <View style = {styles.container}>
            <View>
                <Text style={styles.textResult}>Name from parents: {info.name}, Age from parents: {info.age}</Text>
            </View>
            <View style={styles.inputField}>
                <Text>
                    Enter your name:
                </Text>
                <TextInput style={styles.textInput} value={info.name} placeholder="Enter your name:" onChangeText={(name) => setInfo({...info, 'name': name})} />
            </View>
            <View style={styles.inputField}>
                <Text>
                    Enter your age:
                </Text>
                <TextInput style={styles.textInput} value={String(info.age)} placeholder="Enter your age:" onChangeText={(age) => setInfo({...info, 'age': Number(age)})} keyboardType="numeric" />
            </View>
        </ View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        backgroundColor: '#d7e2a5ff',
        padding: 16,
        borderRadius: 8,
        width: '100%',
    },
    inputField: {
        width: '100%',
        gap: 8
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#ffffff',
    },
    textResult: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    }
});