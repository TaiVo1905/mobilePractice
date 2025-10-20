import { Button } from "@react-navigation/elements";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, Text, View } from "react-native";

// interface Info {
//     name: string;
//     age: number;
// }

export const AlertName = () => {
    const [info, setInfo] = useState({ name: '', age: 1 });
    const showAlert = () => {
        Alert.alert(`Hello, ${info.name} with age ${info.age}`);
    };
    return (
        <View style = {styles.container}>
            <View style={styles.InputField}>
                <Text>
                    Enter your name:
                </Text>
                <TextInput style={styles.textInput} value={info.name} placeholder="Enter your name:" onChangeText={(name) => setInfo({...info, 'name': name})} />
            </View>
            <View style={styles.InputField}>
                <Text>
                    Enter your age:
                </Text>
                <TextInput style={styles.textInput} value={String(info.age)} placeholder="Enter your age:" onChangeText={(age) => setInfo({...info, 'age': Number(age)})} keyboardType="numeric" />
            </View>
            <Button style={styles.alertText} onPress={showAlert}>Show Alert</Button>
        </ View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
        gap: 16
    },
    InputField: {
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
    alertText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#ff5722',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    }
});