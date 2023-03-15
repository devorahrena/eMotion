import React, { useContext, useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import motionData from '../utils/motionData';
import FeelingContext from '../components/FeelingContext'
import similarEmotions from '../utils/similarEmotions';

export default function ColorBreakdown ({route}) {
  const {feeling, navigator} = route.params
  const mainEmotions = ["joyful", "anxious", "angry", "sad", "surprised"]
  console.log(motionData)
  console.log(feeling)
  const context = useContext(FeelingContext)
  const renderSimilar = () => {
    return (
      <View>
        {Object.keys(similarEmotions[feeling]).map(similarFeeling => {
          return (
            <View>
              <View><Text>When you are {feeling} and {similarFeeling}</Text></View>
              {similarEmotions[feeling][similarFeeling].map(movement => {
                <Text>{movement}</Text>
              })}
            </View>
          )
        })}
      </View>
    )
  }
    return (
        <SafeAreaView>
            <View style={styles.selectedContainer}>
                <TouchableOpacity onPress={() => navigator.navigate('ColorSelection', {feeling: feeling})} style={styles.emotionContainer}><Text style={styles.emotionText}>{feeling} </Text><MaterialIcons name="edit" size={24} color={context.colorMapping[feeling]} /></TouchableOpacity>
            </View>
            <View style={styles.explanationContainer}>
              {motionData[feeling] ? <View style={styles.subtitleContainer}><Text style={styles.subtitle}>Here are some activities you like to do when you're feeling <Text style={[styles.emotionText, {color: context.colorMapping[feeling]}]}>{feeling}</Text>:</Text></View> : <View><Text style={styles.subtitle}>You haven't logged any motions with this feeling yet!</Text></View>}
                
                {motionData[feeling] && Object.keys(motionData[feeling]).map((activity, idx) => {
                    return (<Text style={styles.activity}>{idx+1}.&nbsp;{activity}</Text>)
                })}
            </View>
            <View style={styles.similar}><Text style={[styles.emotionText, {textAlign: 'center'}]}>Similar Emotions to {feeling}</Text></View>
            <View style={styles.explanationContainer}>
              {renderSimilar()}
            </View>
          <View style={styles.backArrow}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.goBack()}/>
          </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({ 
      subtitle: {
        fontWeight: '300',
        fontSize: 15,
        textAlign: 'center',
        marginLeft: 10
    },
    subtitleContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    explanationContainer: {
        backgroundColor: 'white',
        width: '90%',
        left: '5%',
        borderRadius: 10,
        padding: 10
    },
      selectedContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-around',
        justifyContent: 'space-around',
        marginTop: 40,
        marginBottom: 20
      },
      selectedText: {
        fontSize: 18
      },
      similar: {
        marginTop: 40
      },
      emotionText: {
        fontSize: 15, 
        fontWeight: '800',
        marginLeft: 4
      },
      emotionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      circle: {
        width: 20, 
        height: 20,
        borderRadius: 10
      },
      activity: {
        fontSize: 15,
        textAlign: 'center'
      },
      backArrow: {
        height: 50,
        position: 'absolute',
        left: 0,
        marginTop: 40
    },
    backArrow: {
      height: 50,
      position: 'absolute',
      left: 0,
      marginTop: 40
  },
})