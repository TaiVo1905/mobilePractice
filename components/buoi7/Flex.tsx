import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Flex() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: 'red' }]}>
          <Text style={styles.textLight}>Session 1</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'white' }]}>
          <Text style={styles.textDark}>Session 2</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'orange' }]}>
          <Text style={styles.textDark}>Session 3</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#74807dff' }]}>
          <Text style={styles.textLight}>Session 4</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#247847ff' }]}>
          <Text style={styles.textLight}>Session 5</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#c515f0b9' }]}>
          <Text style={styles.textLight}>Session 6</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#1be7e0ff' }]}>
          <Text style={styles.textDark}>Session 7</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#1afd16c9' }]}>
          <Text style={styles.textDark}>Session 8</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'blue' }]}>
          <Text style={styles.textLight}>Session 9</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#666666',
  },
  textLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  textDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  }})