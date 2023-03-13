import {
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FeelingContext from '../components/FeelingContext'
import React, { useContext, useState } from 'react'
import Themes from '../assets/Themes'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'

export default function HowDoYouFeel({ route }) {
  const context = useContext(FeelingContext)
  const [currentEmotions, setCurrentEmotions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const movement = route?.params.movement
  const showToast = route?.params.showToast
  const navigator = useNavigation()
  const positions = [
    [40, 20],
    [150, 20],
    [0, 125],
    [92, 190],
    [185, 125],
  ]
  return (
    <SafeAreaView style={styles.container}>
      {selectedCategory == 'all' && (
        <View style={styles.backArrowBox}>
          <MaterialIcons
            name="keyboard-backspace"
            size={30}
            color="black"
            onPress={() => {
              navigator.goBack()
            }}
          />
        </View>
      )}
      <View style={styles.questionView}>
        <Text style={styles.question}>What's your eMotion?</Text>
      </View>
      {/* primary bubbles  */}
      {selectedCategory == 'all' && (
        <View style={styles.circleContainer}>
          <View style={styles.feelingsContainer}>
            {Object.keys(context.emotionsData).map((feeling, idx) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.bubble,
                    {
                      position: 'absolute',
                      backgroundColor: context.colorMapping[feeling],
                      top: positions[idx][1],
                      left: positions[idx][0],
                    },
                  ]}
                  onPress={() => {
                    setSelectedCategory(feeling)
                  }}
                >
                  <Text style={styles.feelingText}>{feeling}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}
      {/* category bubbles  */}
      {selectedCategory != 'all' && (
        <View style={styles.circleContainer}>
          <View style={styles.feelingsContainer}>
            <TouchableOpacity
              style={[
                currentEmotions.indexOf(selectedCategory) >= 0 &&
                  styles.selected,
                styles.bigBubble,
                {
                  backgroundColor: context.colorMapping[selectedCategory],
                },
              ]}
              onPress={() => {
                if (currentEmotions.indexOf(selectedCategory) < 0) {
                  setCurrentEmotions((currentEmotions) => [
                    ...currentEmotions,
                    selectedCategory,
                  ])
                } else {
                  setCurrentEmotions((currentEmotions) =>
                    currentEmotions.filter((item) => item != selectedCategory),
                  )
                }
              }}
            >
              <Text>{selectedCategory}</Text>
            </TouchableOpacity>
            <View style={styles.secondaryContainer}>
              {context.emotionsData[selectedCategory].map(
                (secondaryFeeling) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.bubble,
                        currentEmotions.indexOf(secondaryFeeling) >= 0 &&
                          styles.selected,
                        styles.secondaryBubbles,
                        {
                          backgroundColor:
                            context.colorMapping[secondaryFeeling],
                        },
                      ]}
                      onPress={() => {
                        if (currentEmotions.indexOf(secondaryFeeling) < 0) {
                          setCurrentEmotions((currentEmotions) => [
                            ...currentEmotions,
                            secondaryFeeling,
                          ])
                        } else {
                          setCurrentEmotions((currentEmotions) =>
                            currentEmotions.filter(
                              (item) => item != secondaryFeeling,
                            ),
                          )
                        }
                      }}
                    >
                      <Text>{secondaryFeeling}</Text>
                    </TouchableOpacity>
                  )
                },
              )}
            </View>
          </View>
        </View>
      )}
      <View style={styles.bottomView}>
        <View style={styles.scrollView}>
          <ScrollView
            persistentScrollbar
            horizontal
            style={styles.scrollContainer}
          >
            {currentEmotions.map((emotion) => {
              return (
                <View
                  style={[
                    styles.addedEmotions,
                    { backgroundColor: context.colorMapping[emotion] },
                  ]}
                >
                  <Text>{emotion}</Text>
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() =>
                      setCurrentEmotions((currentEmotions) =>
                        currentEmotions.filter((item) => item != emotion),
                      )
                    }
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        </View>
        {currentEmotions.length > 0 && (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => {
              context.updateMovement(movement, currentEmotions, context.date)
              showToast()
              navigator.navigate('CurrentEmotion')
            }}
          >
            <Text style={styles.addText}>Add Emotions</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* mini circle go back  */}
      {selectedCategory != 'all' && (
        <TouchableOpacity
          style={[styles.circleBack]}
          onPress={() => setSelectedCategory('all')}
        >
          <View
            style={[
              { left: 8, backgroundColor: context.colorMapping['joyful'] },
              styles.miniCircle,
            ]}
          ></View>
          <View
            style={[
              { left: 28, backgroundColor: context.colorMapping['anxious'] },
              styles.miniCircle,
            ]}
          ></View>
          <View
            style={[
              {
                left: 0,
                top: 18,
                backgroundColor: context.colorMapping['angry'],
              },
              styles.miniCircle,
            ]}
          ></View>
          <View
            style={[
              {
                top: 28,
                left: 18,
                backgroundColor: context.colorMapping['sad'],
              },
              styles.miniCircle,
            ]}
          ></View>
          <View
            style={[
              {
                top: 18,
                left: 35,
                backgroundColor: context.colorMapping['surprised'],
              },
              styles.miniCircle,
            ]}
          ></View>
          <MaterialIcons
            style={{ left: 10, top: 10 }}
            name="keyboard-backspace"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  question: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center'
  },
  questionView: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  addText: {
    fontWeight: '500',
  },
  circleBack: {
    position: 'absolute',
    width: 80,
    height: 80,
    left: 20,
    top: 70,
  },
  miniCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 40,
  },
  secondaryBubbles: {
    margin: 10,
  },
  bubble: {
    width: 110,
    height: 110,
    borderRadius: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBubble: {
    width: 100,
    height: 100,
    borderRadius: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feelingText: {
    fontWeight: '800',
  },
  feelingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    borderRadius: 600,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  secondaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: 'black',
    borderWidth: 1,
  },
  addedEmotions: {
    padding: 10,
    borderRadius: 20,
    margin: 10,
    height: 40,
  },
  scrollView: {
    height: 60,
  },
  bottomView: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  selectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 1000,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  backArrowBox: {
    width: '100%',
    justifyContent: 'center',
    height: '7.5%',
    paddingHorizontal: '4%',
  },
  selector: {
    height: '50%',
  },
  close: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
})
