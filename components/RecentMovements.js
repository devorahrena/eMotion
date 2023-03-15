import {
  TextInput,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import FeelingContext from '../components/FeelingContext'
import { useContext, useState } from 'react'
import Emotion from './Emotion'
// import movementData from '../utils/movementData';

export default function RecentMovements({ navigator, showToast }) {
  const context = useContext(FeelingContext)
  // let hardcodedMovementData = movementData.data;
  let movementData = context.movementData;
  console.log("inside recent movements, " + movementData.length);
  console.log(showToast)
  const showRedo = (entry) => {
    var lengthEntry = entry.name.length
    console.log(entry)
    if (lengthEntry <= 2){
      return (<View style={[styles.redo, {backgroundColor: 'white'}]}/>)
    }
    else {
      return (
        <TouchableOpacity
          style={styles.redo}
          onPress={() =>
            navigator.navigate('DuringMotion', {
              selectedMovement: entry.name.substring(entry.name.length - 2, entry.name.length - 1) === " " ? entry.name.substring(0, entry.name.length - 2) : entry.name,
              showToast: showToast
            })
          }
        >
          <Text style={{textAlign: 'center'}}>Redo</Text>
        </TouchableOpacity>
    )}
    
  }
  const renderMovements = (i) => {
    const movements = movementData[i].motionEntry
    console.log("length inside rendermovements is " + movementData[i].motionEntry.length)
    return (
      <View style={styles.entryContainer}>
        <View style={styles.date}>
          <Text>{movementData[i].dateEntry}</Text>
        </View>
        {movements.reverse().map((entry, idx) => {
          return (
            <View key={idx} style={styles.movement}>
              <View style={styles.emotionContainer}>
                <Emotion feelings={entry.feelings} noPulse={true} />
              </View>
              <View style={styles.motionText}>
                <Text style={styles.entryTitle}>Felt {entry.feelings.join(', ')} </Text>
                <Text>{entry.name.substring(entry.name.length - 2, entry.name.length - 1) === " " ? entry.name.substring(0, entry.name.length - 2) : entry.name}</Text>
              </View>
              {showRedo(entry)}
            </View>
          )
        })}
      </View>
    )
  }
  return (
      <ScrollView style={styles.container}>
          <Text style={styles.title}>Recent</Text>
          {renderMovements(movementData.length - 1)}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    flexGrow: 0,
    paddingBottom: 20,
    marginBottom: 30
  },
  entryContainer: {
    display: 'flex',
    justifyContent: 'center', 
    paddingLeft: 10, 
    paddingRight: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
  },
  redo: {
    backgroundColor: '#F3F3F3',
    padding: 5,
    borderRadius: 5,
    flex: 1,

  },
  entryTitle: {
    fontWeight: '700',
    fontSize: 20,
  },
  emotionContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    height: 40,
    flex: 1,
    marginRight: 10
  },
  motionText: {
    flexDirection: 'column',
    flex: 5,
  },
  movement: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
})
