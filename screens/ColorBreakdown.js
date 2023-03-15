import React, { useContext, useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import motionData from '../utils/motionData';
import FeelingContext from '../components/FeelingContext'
import similarEmotions from '../utils/similarEmotions';
import Emotion from '../components/Emotion';

export default function ColorBreakdown ({route}) {
  const {feeling, navigator} = route.params
  console.log(motionData)
  console.log(feeling)
  const context = useContext(FeelingContext)
  const renderSimilar = () => {
    return (
      <ScrollView style={{height: '55%'}}>
        {Object.keys(similarEmotions[feeling]).map(similarFeeling => {
          return (
            <View style={styles.feelingGroup}>
              <View><Text>When you are <Text style={{fontWeight: '800', color: context.colorMapping[feeling]}}>{feeling}</Text> and <Text style={{fontWeight: '800', color: context.colorMapping[similarFeeling]}}>{similarFeeling}</Text></Text></View>
              <View style={styles.smallEmotionContainer}>
              <Emotion feelings={[similarFeeling, feeling]} noPulse={true} /></View>
              {similarEmotions[feeling][similarFeeling].map(movement => {
                return(<View style={styles.similarContainer}>
                <Text style={styles.movement}>{movement}</Text></View>)
              })}
              <View style={styles.separator} />
            </View>
          )
        })}
      </ScrollView>
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
            <View style={styles.similar}><Text style={[styles.emotionText, {textAlign: 'center', marginBottom: 20}]}>Similar Emotions to {feeling}</Text></View>
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
    smallEmotionContainer: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
      height: 40,
      flex: 1,
            // backgroundColor: 'pink',

      // marginRight: 10
    },
    movement: {
      flex: 5,
    },
    similarContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'pink',
      // justifyContent: 'center',

    },
    feelingGroup: {
      display: 'flex',
      padding: 10,
      justifyContent: 'center',
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
        marginLeft: 4,
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
  separator: {
    height: 1, 
    width: '90%',
    backgroundColor: '#ccc',
    marginTop: 10
  }
})
