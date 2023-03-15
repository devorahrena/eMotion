import { ImageBackground, StyleSheet, Text, ScrollView, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Emotion from './Emotion';
import { AntDesign } from '@expo/vector-icons'; 

export default function SuggestedMoves({showToast}) {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={() => {
                        navigator.navigate('DuringMotion', {selectedMovement: '', showToast: showToast})
                    }}>
                    <AntDesign name="plus" size={24} color="black" />
                    <Text style={styles.title}>Let's start moving again.</Text></Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        overflow: 'scroll'
    },
    container: {
        marginBottom: 20
    },
    title: {
        margin: 10,
        fontWeight: "800" 
    },
    emotion: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    card: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        elevation: 20,
        shadowRadius: 3,
        flexDirection: 'row'
    },
    plus: {
        fontSize: 30
    },
    cardText: {
        fontSize: 15,
        fontWeight: "600" 
    }
})
