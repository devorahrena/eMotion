import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Emotion from '../components/Emotion';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import hardcodedMovementData from '../utils/movementData';



const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');



function changeDateFormat(inputDate){  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 
    if (day[0] === '0') {
        day = day[1];
    }

    return month + '/' + day + '/' + year;
}

export default function CalendarScreen() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    let hardcodedMovementData = context.movementData;
    console.log("latest entry: " + hardcodedMovementData[hardcodedMovementData.length-1].dateEntry);
    
    function getMovement(date) {
        for (let i = 0; i < hardcodedMovementData.length; i++) {
          if (hardcodedMovementData[i].dateEntry === date) {
            return hardcodedMovementData[i];
          }
        }
        return -1;
      }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backArrow}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.goBack()}/>
            </View> 
            <View style={styles.topBar}>
            <MaterialCommunityIcons name="calendar-heart" size={28} color="black" />
                <Text style={styles.title}>
                    calendar
                </Text>
            </View>
            <View style={styles.calendarContainer}>
                <Calendar
                    style={[styles.calendar]}

                    dayComponent={({date, _}) => {
                        const newDate = changeDateFormat(date.dateString);
                        let movementFeelings = [];
                        console.log("newdate: " + getMovement(newDate));
                        if (getMovement(newDate) !== -1) {
                            var nestedFeelings = context.movementFeelings(getMovement(newDate));
                            var temp = []
                            for (var i = nestedFeelings.length-1; i >= 0; i--){
                                for (var k = nestedFeelings[i].length-1; k >= 0; k--){
                                    temp.push(nestedFeelings[i][k])
                                }
                            }
                            movementFeelings = temp
                        }
                        return (
                            <View>
                        <Pressable style={styles.date} onPress={() => navigator.navigate("MovementOverview", {date: newDate, feelings: movementFeelings})}>
                            {movementFeelings.length > 0 &&
                            <Emotion feelings={movementFeelings} noPulse={true}/>}
                        </Pressable>
                        <Text style={styles.dayText}>{date.day}</Text>
                        </View>
                        );
                    }}
                    theme={{
                        arrowColor: 'black',
                        backgroundColor: '#ffffff',
                        textMonthFontSize: 25,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#F1F3F5',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    calendar: {
        borderRadius: 20,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 3.5,
        elevation: 5,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '7%',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 28,
        margin: 10
    },
    date: {
        width: '80%',
        aspectRatio: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#D2D2D2'
    },
    dayText: {
        textAlign: 'center',
        color: '#616161'
    },
    calendarContainer: {
        width: '90%',
    },
    backArrow: {
        height: 50,
        position: 'absolute',
        left: 0,
        marginTop: 60,
        zIndex: 1000,
    },
});
