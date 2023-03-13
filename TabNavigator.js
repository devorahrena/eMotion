import React from 'react'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import ReflectionTask from './components/ReflectionTask'
import SettingsTask from './components/SettingsTask'
import NewMotionButton from './components/NewMotionButtton'
import ColorsTask from './components/ColorsTask'
import MainTask from './components/MainTask'
import { useTabMenu } from './utils/TabContext'

const TabNavigator = () => {
  const Tab = createBottomTabNavigator()
  const {opened, toggleOpened} = useTabMenu()
  return (
    <Tab.Navigator
    initialRouteName={'Home'}
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {
          "fontSize":12
        },
        tabBarStyle: [
          {
            display: "flex",
            height: 70
          },
        ],
    }}>
      <Tab.Screen options={{
      tabBarIcon: ({focused}) => (
        <View style={styles.tabIconContainer}>
          <Ionicons name={'home-sharp'} size={25} color={focused ? 'black' : '#AFB7C2'} />
        </View>
      ),
    }}
     name="Home" component={MainTask} />
    <Tab.Screen options={{
      tabBarIcon: ({focused}) => (
        <View style={styles.tabIconContainer}>
          <Ionicons name={'calendar'} size={25} color={focused ? 'black' : '#AFB7C2'} />
        </View>
      ),
    }}
     name="Reflect" component={ReflectionTask} />


    <Tab.Screen options={{
      showLabel: false,
      tabBarIcon: ({focused}) => (
        <View style={styles.tabIconContainer}>
          <Ionicons name={'color-palette-outline'} size={25} color={focused ? 'black' : '#AFB7C2'} />
        </View>
      ),
    }}
     name="Colors" component={ColorsTask} />
    <Tab.Screen options={{
      tabBarIcon: ({focused}) => (
        <View style={styles.tabIconContainer}>
          <Ionicons name={'settings'} size={25} color={focused ? 'black' : '#AFB7C2'} />
        </View>
      ),
    }}
     name="Settings" component={SettingsTask} />
    </Tab.Navigator>

  )
}
const styles = StyleSheet.create({
  tabIconContainer: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default TabNavigator
