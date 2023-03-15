import { StyleSheet, Dimensions, Pressable, Text} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Emotion from '../components/Emotion';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useState, useEffect } from 'react';
import SuggestedMoves from '../components/SuggestedMoves';
import RecentMovements from '../components/RecentMovements';
import EmotionBreakdown from '../components/EmotionBreakdown';
import motionData from '../utils/motionData'
// import hardcodedMovementData from '../utils/movementData';

import Toast from 'react-native-toast-message';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function CurrentEmotion() {
    const isFocused = useIsFocused();
    const [showBreakdown, setShowBreakdown] = useState(false)
    const [movementFeelings, setMovementFeelings] = useState([])
    const context = useContext(FeelingContext);
    let hardcodedMovementData = context.movementData;
    // let movementData = hardcodedMovementData.data;
    console.log("inside current emotion, " + hardcodedMovementData.length);
    const navigator = useNavigation();
    const staticListMotions = [{'name': 'Stretch', 'motionFeelings': null}, {'name': 'Walk to University Ave', 'motionFeelings': null}, {'name': 'Hike with Friends', 'motionFeelings': null}, {'name': 'Yoga', 'motionFeelings': null}]
    const [suggestedMotions, setSuggestionMotions] = useState([])
    function getMotions (currentFeelings) {
        let motions = {};
        let suggestions = [[]]; //sparse 2D array, index indicates instance (so later in the array is higher association)
        for (let i = 0; i < currentFeelings.length; i++) { //for every feeling that the user feels right now, get matching movements
            let currentFeeling = currentFeelings[i];
            if (motionData[currentFeeling]){
                let associatedMovements = motionData[currentFeeling]; //does this work? associatedMovements is now an object containing movement key and instance value
                for (const movement in associatedMovements) {
                    let suggestion = {};
                    suggestion.movementName = movement;
                    suggestion.feeling = currentFeeling;
                    let index = associatedMovements[movement];
                    if (suggestions[index] == undefined){
                        suggestions[index] = []
                    }
                    suggestions[index].push(suggestion);
                }
            }
        }
        //suggestions is now populated in reverse order of all movements associated with feelings (higher index = stronger association)
        //TODO: some math so that indices can add if a movement is associated with multiple feelings
        for (let i = suggestions.length - 1; i > -1; i--) {
            if (suggestions[i]){
                for (let j = 0; j < suggestions[i].length; j++) {
                    if (suggestions[i][j].movementName in motions) {
                        motions[suggestions[i][j].movementName].push(suggestions[i][j].feeling);
                    } else {
                        motions[suggestions[i][j].movementName] = [suggestions[i][j].feeling];
                    }
                }
            }
        }
        let motionList = [];
        for (const motion in motions) {
            motionList.push({
                name: motion,
                motionFeelings: motions[motion],
            });
        }
        return motionList
    }

    useEffect(() => {
        if((hardcodedMovementData[hardcodedMovementData.length - 1].dateEntry !== (context.date)) && (hardcodedMovementData[hardcodedMovementData.length - 1].dateEntry !== ('0'+context.date))) {
           
        // if (context.getCurrentMovementIndex() == -1){
            setMovementFeelings(['startScreen'])
            setSuggestionMotions(staticListMotions)
        }
        else {

            // var nestedFeelings = context.movementFeelings(context.hardcodedMovementData[context.getCurrentMovementIndex()])
            var nestedFeelings = context.movementFeelings(hardcodedMovementData[hardcodedMovementData.length-1])
            var temp = []
            for (var i = nestedFeelings.length-1; i >= 0; i--){
                for (var k = nestedFeelings[i].length-1; k >= 0; k--){
                    temp.push(nestedFeelings[i][k])
                }
            }
            setMovementFeelings(temp)
            setSuggestionMotions(getMotions(temp))
        }
    }, [isFocused])
    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Your eMotion is logged successfully',
          text2: 'Check out the change in your orb 👋'
        });
      }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.appTitle}>eMotion</Text>
            <Pressable style={styles.movementBox} onLongPress={() => setShowBreakdown(true)} onPress = {() => {
                navigator.navigate('HowDoYouFeel', {movement: '',  showToast: showToast})
                }}>
                <Emotion feelings={movementFeelings} />
            </Pressable>
            {showBreakdown && <EmotionBreakdown panel={showBreakdown} setPanel={() => setShowBreakdown(!showBreakdown)}/>}
            <SuggestedMoves showToast={showToast} />
            <RecentMovements navigator={navigator} showToast={showToast}/>
            <Toast />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eee',
        marginTop: 20
    },
    appTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: SCREEN_HEIGHT * 0.03
    },  
     movementBox: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        height: '30%',
        margin: 20
     },
     emotionBox: {
        aspectRatio: 1,
        height: '100%',
        position: 'absolute'
     },
     titleContainer: {
        height: '11%',
        justifyContent: 'center',
        width: '90%',
        fontSize: 20
     },
     optionText: {
        fontSize: 20
     }
});
