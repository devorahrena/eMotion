import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from './node_modules/@react-navigation/native';
import React from 'react';
import FeelingContext from './components/FeelingContext';
import { useState } from 'react';
import { basicToSecondary, basicColorMapping, mapAllColors } from './assets/feelings.js';
import hardcodedMovementData from './utils/movementData';

import friendsData from './utils/friendsData';
import contactsData from './utils/contactsData';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import {TabContextProvider} from './utils/TabContext';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notificationss

console.disableYellowBox = true;


export default function App() {
  const [currentFeelings, setCurrentFeelings] = useState([]);
  const [basic, setBasic] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const [motion, setMotion] = useState({name:'', feelings:[], note:""});
  const [movementData, setMovementData] = useState(hardcodedMovementData);
  const [colorMapping, setColorMapping] = useState(mapAllColors(basicColorMapping));
  const [friends, setFriends] = useState(friendsData);
  const [contacts, setContacts] = useState(contactsData);
  const [emotionsData, setEmotionsData] = useState(basicToSecondary)
  const [currentEmotions, setCurrentEmotions] = useState([])
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;




  function removeFriend(name, username) {
    let updatedFriends = friends;
    let updatedContacts = contacts;
    let friend = {};
    friend.name = name;
    friend.username = username;
    updatedContacts.push(friend);
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].name == name) {
        updatedFriends.splice(i, 1);
      }
    }
    setFriends(updatedFriends);
    setContacts(updatedContacts);
  }

  function addFriend(name, username) {
    let updatedFriends = friends;
    let updatedContacts = contacts;
    let contact = {};
    contact.name = name;
    contact.username = username;
    updatedFriends.push(contact);
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name == name) {
        updatedContacts.splice(i, 1);
      }
    }
    setFriends(updatedFriends);
    setContacts(updatedContacts);
  }

  function updateColorMapping(feeling, parent, newColor) {
    if (parent) {
      addEmotionToData(parent, feeling)
    }
    colorMapping[feeling] = newColor
  }
  
  function getCurrentMovementIndex() {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === date) {
        return i
      }
    }
    return -1
  }

  async function updateCurrentFeelings(bas, sec) {
    let updated = [];
    for (let i = 0; i < bas.length; i++) {
      updated.push(bas[i]);
    }
    
    for (let i = 0; i < sec.length; i++) {
      //basic feeling
      updated.push(sec[i]);
    }
    setCurrentFeelings(updated);

  }


  function editNote(status, movementDate, motionName, text) {
    if (status === 'motion') {
      for (let i = 0; i < movementData.length; i++) {
        if (movementData[i].dateEntry === movementDate) {
          for (let j = movementData[i].motionEntry.length - 1; j >= 0; j--) {
              if (movementData[i].motionEntry[j].name.substring(0, movementData[i].motionEntry[j].name.length-2) === motionName) {
                while (movementData[i].motionEntry[j-1].name.substring(0, movementData[i].motionEntry[j-1].name.length-2) === motionName) {
                  j -= 1
                }
                let updated = [...movementData];
                updated[i].motionEntry[j].note = text;
                setMovementData(updated);
              }
          }
        }
      }
    } else {
      for (let i = 0; i < movementData.length; i++) {
        if (movementData[i].dateEntry === movementDate) {
          for (let j = 0; j < movementData[i].motionEntry.length; j++) {
              if (movementData[i].motionEntry[j].name === motionName) {
                let updated = [...movementData];
                updated[i].motionEntry[j].note = text;
                setMovementData(updated);
              }
          }
        }
      }
    }
  }

  function editMotionFromReflection(movementDate, motionName, newFeelings) {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === movementDate) {
        for (let j = 0; j < movementData[i].motionEntry.length; j++) {
            if (movementData[i].motionEntry[j].name === motionName) {
              let updated = [...movementData];
              updated[i].motionEntry[j].feelings = newFeelings;
              setMovementData(updated);
            }
        }
      }
    }
  }

  function getTime() {
    let newDate = new Date();
    let time = newDate.getHours();
    if(newDate.getMinutes() < 10) {
      time += ':0' + newDate.getMinutes();
    } else {
      time += ':' + newDate.getMinutes();
    }
    return time;
  }

  function updateMotion(name, feelings, note) {
    let updated = {};
    if (motion.name !== name) {
      updated.name = name;
      updated.feelings = feelings;
      updated.note = "";

    } else {
      updated = {...motion};
      for (let i = 0; i < feelings.length; i++) {
        if (motion.feelings.indexOf(feelings[i]) === -1) {
          updated.feelings.push(feelings[i]);
        }
      }
    }
    setMotion(updated);
  }

  //returns the names of all motions stored in a given movement
  function movementNames(term) {
    let names = [];
    for (let i = 0; i < term.motionEntry.length; i++) {
      names.push(term.motionEntry[i].name);
    }
    return names;
  }

  function getFeelingsDate(date) {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === date) {
        const movement = movementData[i];
        let feelings = [];
        for (let i = 0; i < movement.motionEntry.length; i++) {
          let set = movement.motionEntry[i]['feelings'];
          for (let j = 0; j < set.length; j++) {
            feelings.push(set[j]);
          }
        }
      return feelings;
      }
    }
    return [];
  }

  function getMovement(date) {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === date) {
        return movementData[i];
      }
    }
    return -1;
  }

  function movementFeelings(term) {
    let feelings = [];
    for (let i = 0; i < term.motionEntry.length; i++) {
      feelings.push(term.motionEntry[i].feelings);
    }
    return feelings;
  }
  function addEmotionToData (basic, secondary) {
    emotionsData[basic].push(secondary)
  }
  function updateMovement(name, feelings, movementDate) {
    let updated = [...movementData];
    if (name == "") {
      name = getTime();
    }
    let newMotion = {};
    //add a number to the motion name
    
    newMotion.name = name;
    newMotion.feelings = feelings;
    newMotion.note = "";
    //if >=one motion for today has already been logged
    let movementIndex = -1;
    if (movementDate === date) {
      movementIndex = getCurrentMovementIndex();
    } else {
      for (let i = 0; i < movementData.length; i++) {
        if (movementData[i].dateEntry === movementDate) {
          movementIndex = i;
        }
      }
    }
    if (movementIndex !== -1) {
      //add the correct number to the motion name
      let count = 1;
      for (let i = 0; i < movementData[movementIndex].motionEntry.length; i++) {
        if (movementData[movementIndex].motionEntry[i].name == (name + " " + count)) {
          count++;
        }
      }
      newMotion.name += " " + count;
      updated[movementIndex].motionEntry.push(newMotion);
      setMovementData(updated);
    } else {
      //newMotion name will be the first one, no need to loop
      newMotion.name += " 1";
      let movementEntry = {};
      movementEntry.dateEntry = movementDate;
      movementEntry.motionEntry = [];
      movementEntry.motionEntry.push(newMotion);
      updated.push(movementEntry);
      setMovementData(updated);
    }
  }

  const feelingSettings = {
    basic: basic,
    setBasic: setBasic,
    secondary: secondary,
    setSecondary: setSecondary,
    currentFeelings: currentFeelings,
    updateCurrentFeelings: updateCurrentFeelings,
    motion: motion,
    updateMotion: updateMotion,
    updateMovement: updateMovement,
    movementFeelings: movementFeelings,
    getFeelingsDate: getFeelingsDate,
    getCurrentMovementIndex: getCurrentMovementIndex,
    getMovement: getMovement,
    movementData: movementData,
    date: date,
    editNote: editNote,
    editMotionFromReflection: editMotionFromReflection,
    colorMapping: colorMapping,
    updateColorMapping: updateColorMapping,
    friends: friends,
    contacts: contacts,
    addFriend: addFriend,
    removeFriend: removeFriend,
    currentEmotions: currentEmotions,
    setCurrentEmotions: setCurrentEmotions,
    emotionsData: emotionsData,
    addEmotionToData: addEmotionToData

  };
  return (  
    <FeelingContext.Provider value={feelingSettings}>
    <SafeAreaProvider>
    <TabContextProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </TabContextProvider>
      </SafeAreaProvider>
    </FeelingContext.Provider>
  );
}
