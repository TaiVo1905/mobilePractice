import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const HelloWorldScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.helloText}>Hello, Đức Tài!</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    helloText: {
        fontSize:30,
        fontWeight:'bold',
        color: '#ff5722'
    }
});