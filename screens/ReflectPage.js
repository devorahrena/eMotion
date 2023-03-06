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
            <View style={styles.instructionsContainer}>
                <Text style={styles.title}>reflect</Text>
            </View>
            <View style={styles.subtitleContainer}><View style={styles.neutralOrb}/><Text style={styles.subtitle}>Welcome Back!</Text></View>
            <CalendarWeek navigator={navigator}/>
            <View style={styles.feelingContainer}><Text style={styles.subtitle}>Feeling Patterns</Text><MaterialCommunityIcons name="circle-half-full" size={24} color="black" /></View>
            <FeelingPatterns navigator={navigator}/>
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
    subtitle: {
        fontWeight: '800',
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 10
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
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
    }
})