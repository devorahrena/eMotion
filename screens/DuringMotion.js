import { Image, TouchableOpacity, Modal, TextInput, Pressable, View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import motionData from "../utils/motionData";
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function DuringMotion({route}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const [movementStarted, setMovementStarted] = useState(false)
    const [movement, setMovement] = useState(route.params.selectedMovement)
    const [text, setText] = useState('')
    const [motions, setMotions] = useState([])
    useEffect(() => {
        setMotions(getMotions(motionData));
    }, [])

    const getMotions = (motionData) => {
        var motionList = []
        for (var feeling of Object.keys(motionData)){
            for (var motion of Object.keys(motionData[feeling])){
                if (motionList.indexOf(motion) < 0){
                    motionList.push(motion)
                }
            }
        }
        return motionList;
    }
    const filterData = (data) => {
        var filteredList = []
        if (text.length == 0){
            return []
        }
        else {
            for (var motion of data){
                if (motion.toLowerCase() == text.toLowerCase()){
                    return []
                }
                if (motion.toLowerCase().includes(text.toLowerCase())){
                    filteredList.push(motion)
                }
            }
            return filteredList
        }
    }
    const renderOptions = filterData(motions).map((motion) => {
        return (
            <TouchableOpacity onPress={() => setText(motion)} style={styles.option}><Text style={{color: 'white'}}>{motion}</Text></TouchableOpacity>
        )
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.movementContainer}>
                {movement.length > 0 && <Text style={styles.motion}>{movement}</Text>}
                {movement.length == 0 && 
                    motions.length > 0 && 
                    <View style={styles.autocompleteContainer}>
                        <View style={{height: 70}}><ScrollView horizontal>{renderOptions}</ScrollView></View>
                        <TextInput style={styles.textinput} onChangeText={setText} value={text} placeholder="Type a movement..." />
                    </View>}
            </View>
            
            {!movementStarted && (movement.length > 0 || text.length > 0) && 
                <View style={styles.bottomViewContainer}>
                    <TouchableOpacity style={styles.startMovingContainer} onPress={() => {
                            setMovementStarted(true)
                            if (text.length > 0) setMovement(text)
                        }}>
                        <Text style={styles.bottomText}>Begin Movement</Text>
                    </TouchableOpacity>
                </View>
                }
            {movementStarted && 
            <View style={styles.bottomViewContainer}>
                <TouchableOpacity style={styles.startMovingContainer} onPress={() => 
                    {
                        context.updateMotion(text.length > 0 ? text : movement, []);
                        navigator.navigate('HowDoYouFeel', {movement: text.length > 0 ? text : movement})
                    }}>
                    <Text style={styles.bottomText}>End Movement</Text>
                </TouchableOpacity>
            </View>}
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                navigator.goBack()}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
    },
    movementContainer:{
        width: '100%',
        height: '75%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    },
    startMovingContainer: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        elevation: 20,
        backgroundColor: 'white',
        shadowRadius: 3,
    },
    motion: {
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
     option: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10, 
        margin: 10
     },
    textinput: {
        fontSize: 28,
        borderBottomWidth: 1,
        width: '100%'
    },
    bottomText: {
        fontWeight: '500',
        fontSize:20,
    },
    bottomViewContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '25%',
        marginTop: 10
    },
    autocompleteContainer: {
        left: '5%',
        flex: 1,
        position: 'absolute',
        top: 100,
        zIndex: 1,
      },
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
        position: 'absolute',
        top: 20
    },
});
