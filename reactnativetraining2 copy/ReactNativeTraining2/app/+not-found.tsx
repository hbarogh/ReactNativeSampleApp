import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
        <View style={styles.container}>
            <Link href="/" style={styles.button}>
                Go Back to Home Screen
            </Link>
        </View>
    </>
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
