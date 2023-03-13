import { TextInput, ImageBackground, StyleSheet, Text, Button, Image, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import Movement from '../components/Movement';
import Emotion from '../components/Emotion';
import EmotionTimeline from '../components/EmotionTimeline';
import Timeline from 'react-native-timeline-flatlist';
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function MovementOverview({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);
    const [text, setText] = useState("");
    const { date, feelings } = route.params;
    const [uniqueFeelings, setUniqueFeelings] = useState([])
    const [data, setData] = useState([])

    const movement = context.getMovement(date);
    let displayedContent = [];
    const timelineProps = {
        circleColor: '#aaa',
        lineColor: '#aaa',
        circleSize: 10,
        detailContainerStyle: {
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'black',
          padding: 10,
          margin: 10
        }
  
      };
    useEffect(() => {
        var temp = []
        for (var feeling of feelings){
            if (temp.indexOf(feeling) < 0){
                temp.push(feeling)
            }
        }
        setUniqueFeelings(temp)
        temp = []
        var firstItem = { title: 'Started the Day!', description: ':)'}
        if (movement.motionEntry){
          var movementData = movement.motionEntry
          for (var entry of movementData) {
            temp.push({title: entry.feelings.join(', '), description: entry.name.length > 0 && `from ${entry.name}`, circleColor: context.colorMapping[entry.feelings[0]], lineColor: context.colorMapping[entry.feelings[0]]})
          }
          temp.push(firstItem)
          setData(temp)
        }
    }, [])
    if (movement === -1) {
        displayedContent = (
            <View style={styles.container}>
                <View style={styles.backArrowBox}>
                    <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CalendarScreen')}/>
                </View>
                <Text>
                    No Data for {date}
                </Text>
            </View>
        )
    } else {
        displayedContent = (
            <View style={{height: '100%'}}>
                        <View style={styles.movementBox}><Emotion feelings={feelings} noPulse={true}/></View>
                    <View style={styles.feelingsText}>
                        <Text style={styles.text}>On {date}, you were feeling </Text>
                        <Text style={styles.text}>{uniqueFeelings.join(', ')}</Text>
                    </View>
                <Timeline {...timelineProps} data={data}/> 
                    <View style={styles.backArrowBox}>
                        <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CalendarScreen')}/>
                    </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>{displayedContent}</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    motionsList: {
        height: '41%',
        width: '100%',
    },
    movementBox: {
        marginLeft: '28.5%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width:'100%',
        aspectRatio: 1,
    },      
    feelingsText:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 10
    },
    backArrowBox: {
        height: 50,
        position: 'absolute',
        left: 0,
        marginTop: 15
    },
    textButton: {
        fontSize: SCREEN_HEIGHT * 0.03
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '5%',
        width: '65%',
        height: '8%',
        borderRadius: 1000
     },
});
