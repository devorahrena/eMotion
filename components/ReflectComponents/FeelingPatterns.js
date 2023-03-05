import React, { useContext, useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import FeelingContext from '../FeelingContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

export default function FeelingPatterns({navigator}) {

    const context = useContext(FeelingContext);
    var hardcodedTopFeelings = ['powerful', 'amazed', 'peaceful', 'stressed', 'joyful']
    const renderPatterns = hardcodedTopFeelings.map((feeling) => {
        return (
            <View>
            <View style={styles.separator}/>
                <View style={styles.feelingInfo}>
                    <View style={[styles.colorCircle, {backgroundColor: context.colorMapping[feeling]}]}/>
                    <Text style={styles.feeling}>{feeling}</Text>
                </View>
            </View>
        )
    })
   
    return (
        <View style={styles.shadow}>
            <TouchableOpacity style={styles.container} onPress={() => navigator.navigate("Patterns")}>
                <Text>Emotion</Text>
                {renderPatterns}
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
        overflow: 'hidden',
    },
    colorCircle: {
        width: 20, height: 20, borderRadius: 10
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#bdbdbd'
    },
    feelingInfo: {
        flexDirection: 'row',
        margin: 10
    },
    feeling: {
        marginLeft: 10,
    },
    shadow: {
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 8,

    },
    icon: {
        position: 'absolute',
        left: 10,
        top: 5
    },
    text: {
        textAlign: 'center'
    },
    smallText: {
        fontSize: 14,
        textAlign: 'right'
    },
    daysOfWeek: {
        color: '#626262'
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    dayCircle: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#D2D2D2'
    },
    weekContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})