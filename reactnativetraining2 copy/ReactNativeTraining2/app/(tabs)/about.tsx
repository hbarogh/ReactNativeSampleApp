import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AboutScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff"
  }
});