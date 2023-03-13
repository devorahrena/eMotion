import { Image, TouchableOpacity, Modal, TextInput, Pressable, View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect, useRef } from "react";
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
    const inputRef = React.useRef();
    useEffect(() => {
        setMotions(getMotions(motionData));
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0);
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
            <TouchableOpacity onPress={() => setText(motion)} style={styles.option}><Text style={{color: 'white', fontSize: 10}}>{motion}</Text></TouchableOpacity>
        )
    })
    return (
        <SafeAreaView style={styles.container}>
            <View>
            <View style={styles.movementContainer}>
                {movement.length > 0 && <Text style={styles.motion}>{movement}</Text>}
                {movement.length == 0 &&
                    motions.length > 0 &&
                    <View style={styles.autocompleteContainer}>
                        <View style={{height: 50}}><ScrollView horizontal showsHorizontalScrollIndicator={false}>{renderOptions}</ScrollView></View>
                        <View style={styles.userInput}>
                          <TextInput ref={inputRef} style={styles.textinput} autoFocus={true} onChangeText={setText} value={text} placeholder="Type a movement..." />
                          <Pressable style={styles.startButton} onPress={() => {
                                  setMovementStarted(true)
                                  if (text.length > 0) setMovement(text)
                          }}>
                            <Text> Start </Text>
                          </Pressable>
                        </View>
                    </View>}
            </View>

            {movementStarted &&
            <View style={styles.bottomViewContainer}>
                <TouchableOpacity style={styles.startMovingContainer} onPress={() =>
                    {
                        context.updateMotion(text.length > 0 ? text : movement, []);
                        navigator.navigate('HowDoYouFeel', {movement: text.length > 0 ? text : movement, showToast: route.params.showToast})
                    }}>
                    <Text style={styles.bottomText}>End movement</Text>
                </TouchableOpacity>
            </View>}
            </View>
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={30} color="black" onPress={() => {
                navigator.goBack()}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center'
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
        fontSize: SCREEN_HEIGHT * 0.035,
    },
     option: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
        margin: 9
     },
    textinput: {
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.035,
        width: '100%'
    },
    bottomText: {
        fontSize: 24,
        fontWeight: '200'
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
      },
    backArrowBox: {
        width: '100%',
        height: '7.5%',
        paddingHorizontal: '4%',
        position: 'absolute',
        top: 60
    },
    startButton: {
      position: 'absolute',
      alignSelf: 'center',
      right: 0,
    },
    userInput: {
      display: 'flex',
      flexDirection: 'row'
    }
});
