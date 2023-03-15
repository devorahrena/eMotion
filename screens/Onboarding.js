import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native';

import OnboardingItem from '../components/Onboarding/OnboardingItem'
import slides from '../utils/screens'
import Paginator from '../components/Onboarding/Paginator'
import { AntDesign } from '@expo/vector-icons';

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current
  const { width } = useWindowDimensions()
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current
  const navigator = useNavigation();
  const goNextSlide = () => {
    const nextSlideIndex = currentIndex + 1
    const nextSlideOffset = nextSlideIndex * width
    slidesRef?.current?.scrollToOffset({nextSlideOffset})
    setCurrentIndex(currentIndex+1)
  }
  return (
    <View style={styles.container}>
      <Paginator data={slides} scrollX={scrollX}/>

      <FlatList
        data={slides}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <OnboardingItem navigator={navigator} item={item} />}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <TouchableOpacity style={[currentIndex == 4 && styles.skipButton, styles.skip]} onPress={() => navigator.navigate('CurrentEmotion')}><Text style={[styles.skipText, currentIndex == 4 && {color: 'white'}]}>{currentIndex < 4 ? 'Skip' : 'Get Started'}</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white'
  },
  skipText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#89B0AD'
  },
  skipButton: {
    backgroundColor: '#89B0AD',
  },
  skip: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    width: 150,
    borderColor: '#89B0AD',
    marginBottom: 50
  }
})
