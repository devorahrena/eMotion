import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import FeelingContext from '../components/FeelingContext';
import CalendarWeek from '../components/ReflectComponents/CalendarWeek';
import { useNavigation } from '@react-navigation/native';
import FeelingPatterns from '../components/ReflectComponents/FeelingPatterns';

export default function ReflectPage () {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    
    return (
        <SafeAreaView style={{margin: 20}}>
            <View style={styles.calendarContainer}><CalendarWeek navigator={navigator}/></View>
            <View style={styles.feelingContainer}><FeelingPatterns navigator={navigator}/></View>
            <View style={{flexDirection: 'row'}}><TouchableOpacity style={styles.seeAllButton} onPress={() => navigator.navigate("Patterns")}><Text>See all eMotions</Text></TouchableOpacity></View>
            <View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontWeight: '800',
        fontSize: 24,
        textAlign: 'center'
    },
seeAllButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
},
    subtitle: {
        fontWeight: '800',
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 10,
        marginBottom: 10
    },
    calendarContainer: {
        marginTop: 40
    },
    subtitleContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    neutralOrb: {
        backgroundColor: '#47EF80',
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    feelingContainer: {
        marginTop: 30
    },
    color: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10
    },
    colorsContainer: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    instructionsContainer: {
        marginTop: 20
    }
})
