import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native'

export default function OnboardingItem ({item}) {
    const { width } = useWindowDimensions()
    return (
        <View style={[styles.container, {width}]}>
            <Image source={require('../../assets/emotion-logo.png')} />
            <Image source={item.image} style={[styles.image, {width: width/1.5, resizeMode: 'contain'}]}/>
            <View style={{ top: 30, flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                {item.description.map((description)  => {
                    return (
                        <Text style={styles.description}>{description}</Text>
                    )
                })}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        top: 40,
        flex: 0.5,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 20,
        marginBottom: 10,
        color: '#89B0AD',
        textAlign: 'center',
    },
    description: {
        top: 15,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 20
    }
})
