import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PrintNameAndAgeChild } from "./PrintNameAndAgeChild";

interface Info {
    name: string;
    age: number;
}

export const PrintNameAndAgeParent = () => {
    const [info, setInfo] = useState<Info>({ name: '', age: 1 });
    return (
        <View style = {styles.container}>
            <View style={{backgroundColor: '#eb8a8aff', padding: 16, borderRadius: 8, width: '100%', gap: 16}}>
                <View>
                    <Text style={styles.textResult}>Name: {info.name}, Age: {info.age}</Text>
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
            </View>
            <PrintNameAndAgeChild info={info} setInfo={setInfo} />
        </ View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
        gap: 16
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