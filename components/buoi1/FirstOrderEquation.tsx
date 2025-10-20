import { Button } from "@react-navigation/elements";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// interface Info {
//     name: string;
//     age: number;
// }

export const FirstOrderEquation = () => {
    const [vals, setVals] = useState({ a: '0', b: '0' });
    const [result, setResult] = useState('');
    const inputARef = React.useRef<TextInput>(null);
    const inputBRef = React.useRef<TextInput>(null);
    const calculateX = () => {
        if(isNaN(Number(vals.a)) && isNaN(Number(vals.b))) {
            setResult('Please enter valid numbers for a and b');
            inputARef.current?.focus();
            setVals({a: '0', b: '0'});
            return;
        } else if (isNaN(Number(vals.a))) {
            setResult('Please enter valid number for a');
            inputARef.current?.focus();
            setVals({a: '0', b: vals.b});
            return;
        } else if (isNaN(Number(vals.b))) {
            setResult('Please enter valid number for b');
            inputBRef.current?.focus();
            setVals({a: vals.a, b: '0'});
            return;
        }
        if (vals.a === '0') {
            if (vals.b === '0') {
                setResult('Equation has infinite solutions');
                return;
            }
            setResult('Equation has no solution');
            return;
        }
        setResult(String((-Number(vals.b) / Number(vals.a)).toFixed(2)));
    };
    return (
        <View style = {styles.container}>
            <View style={styles.InputField}>
                <Text>
                    Enter value a:
                </Text>
                <TextInput ref={inputARef} style={styles.textInput} value={String(vals.a)} onChangeText={(a) => setVals({...vals, a: a})} keyboardType="numeric" />
            </View>
            <View style={styles.InputField}>
                <Text>
                    Enter value b:
                </Text>
                <TextInput ref={inputBRef} style={styles.textInput} value={String(vals.b)} onChangeText={(b) => setVals({...vals, b: b})} keyboardType="numeric" />
            </View>
            <Button style={styles.button} onPress={calculateX}>Calculate</Button>
            <Text style={styles.result}>{result != '' ? `The result is: ${result}` : ''}</Text>
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
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: '#ff5722',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    }
});