import React, { useContext, useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import FeelingContext from '../FeelingContext';
import Emotion from '../Emotion';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

export default function CalendarWeek({navigator}) {

    const context = useContext(FeelingContext);
    const [week, setWeek] = useState([])
    const idxToDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    
    useEffect(() => {
        var today = new Date()
        var days = 86400000 //number of milliseconds in a day
        var tempWeek = [  new Date(today - (6*days)), new Date(today - (5*days)),  new Date(today - (4*days)),  new Date(today - (3*days)),  new Date(today - (2*days)),  new Date(today - (1*days)),  new Date(today)]
        setWeek(tempWeek)
    }, [])
    function formatDate(inputDate){
        return `${inputDate.getMonth()+1 < 10 && '0'}${inputDate.getMonth()+1}/${inputDate.getDate()}/${inputDate.getFullYear()}` 
    }
    const showPressable = (day) => {
        var dayChange = formatDate(day)
        let movementFeelings = [];
        if (context.getMovement(dayChange) !== -1) {
            var nestedFeelings = context.movementFeelings(context.getMovement(dayChange));
            var temp = []
            for (var i = nestedFeelings.length-1; i >= 0; i--){
                for (var k = nestedFeelings[i].length-1; k >= 0; k--){
                    temp.push(nestedFeelings[i][k])
                }
            }
            movementFeelings = temp
        }
        return (
        <Pressable style={styles.date} onPress={() => navigator.navigate("MovementOverview", {date: dayChange, feelings: movementFeelings})}>
            {movementFeelings.length > 0 &&
            <Emotion feelings={movementFeelings} noPulse={true}/>}
        </Pressable>
        )
    }
    return (
        <View style={styles.shadow}>
            <TouchableOpacity style={styles.container} onPress={() => navigator.navigate("CalendarScreen")}>
                <MaterialCommunityIcons style={styles.icon} name="calendar-heart" size={28} color="black" />
                <Text style={[styles.text, styles.title]}>Your Past Week</Text>
                <View style={styles.separator}/>
                <View style={styles.weekContainer}>{
                    week.map((day) => {
                        return (
                            <View>
                                <Text style={[styles.text, styles.daysOfWeek]}>{idxToDay[day.getDay()]}</Text>
                                <View style={styles.dayCircle}>
                                {showPressable(day)}
                                </View>
                            </View>
                        )
                    })}
                </View>
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
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#bdbdbd'
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
        textAlign: 'right',
    },
    smallTextHolder: {
        backgroundColor: '#aaa',
        padding: 5,
        borderRadius: 5,
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
