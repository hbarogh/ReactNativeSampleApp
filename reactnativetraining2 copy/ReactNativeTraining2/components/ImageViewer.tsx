import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

type Props = {
    imgSource: string;
};

export default function ImageViewer({imgSource} : Props) {
  return (
    <Image source={imgSource} style={styles.image} />
  )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    }
})