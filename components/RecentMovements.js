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
export default function RecentMovements({ navigator }) {
  const context = useContext(FeelingContext)
  const renderMovements = (i) => {
    return (
      <View style={styles.entryContainer}>
        <View style={styles.date}>
          <Text>{context.movementData[i].dateEntry}</Text>
        </View>
        {context.movementData[i].motionEntry.map((entry, idx) => {
          return (
            <View key={idx} style={styles.movement}>
              <View style={styles.emotionContainer}>
                <Emotion feelings={entry.feelings} noPulse={true} />
              </View>
              <View style={styles.motionText}>
                <Text style={styles.entryTitle}>{entry.name}</Text>
                <Text>{entry.feelings.join(', ')} </Text>
              </View>
              <TouchableOpacity
                style={styles.redo}
                onPress={() =>
                  navigator.navigate('DuringMotion', {
                    selectedMovement: entry.name,
                  })
                }
              >
                <Text style={{textAlign: 'center'}}>Redo</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }
  return (
      <ScrollView style={styles.container}>
          <Text style={styles.title}>Recent</Text>
          {renderMovements(0)}
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
