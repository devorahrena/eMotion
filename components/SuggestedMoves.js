import { ImageBackground, StyleSheet, Text, ScrollView, Pressable, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import { useContext, useRef, useEffect } from 'react';
import Emotion from './Emotion';
import { AntDesign } from '@expo/vector-icons';

export default function SuggestedMoves({showToast}) {
    const navigator = useNavigation();

    const animatedScale = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      animatedScale.setValue(1);
    }, []);

    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={() => {
                        animatedScale.setValue(0,8);
                        Animated.spring(animatedScale, {
                          toValue:1,
                          bounciness: 20,
                          speed: 100,
                          useNativeDriver: true,
                        }).start();
                        navigator.navigate('DuringMotion', {selectedMovement: '', showToast: showToast});
              }}>
                    <Animated.View
                    style={[styles.button, {transform: [{scale: animatedScale}]}]}>
                      <AntDesign name="plus" size={15} color="black" />
                      <Text style={styles.title}>Let's start moving again.</Text>
                    </Animated.View>
              </Pressable>
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
        fontWeight: "800",
        fontSize: 13
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
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

    }
})
