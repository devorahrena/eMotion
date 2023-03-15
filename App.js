import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from './node_modules/@react-navigation/native';
import React from 'react';
import FeelingContext from './components/FeelingContext';
import { useCallback, useState, useEffect } from 'react';
import { basicToSecondary, basicColorMapping, mapAllColors } from './assets/feelings.js';
import hardcodedMovementData from './utils/movementData';
import friendsData from './utils/friendsData';
import contactsData from './utils/contactsData';
import loopData from './config/addData';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import {TabContextProvider} from './utils/TabContext';
import SplashScreen from 'expo-splash-screen';
import { waitUntil, WAIT_FOREVER } from 'async-wait-until';





import { getDatabase, set, ref, onValue} from "firebase/database";
import database from "./config/firebase";


import uuid from 'react-native-uuid';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notificationss

console.disableYellowBox = true;


export default function App() {

  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {

  //       await hardcodedMovementData.loadAsync(hardcodedMovementData);
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  const [currentFeelings, setCurrentFeelings] = useState([]);
  const [basic, setBasic] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const [motion, setMotion] = useState({name:'', feelings:[], note:""});
  // const initMovementData = waitUntil(() => hardcodedMovementData.data.length !== 0, {
  //   // timeout: WAIT_FOREVER, // === Number.POSITIVE_INFINITY
  //   intervalBetweenAttempts: 50, 
  // });
  // const [movementData, setMovementData] = useState(hardcodedMovementData.data);
    const [movementData, setMovementData] = useState(hardcodedMovementData);

  // console.log("1 +++++++++++++++++++++++++++movement data is " + hardcodedMovementData.data.length);
  // console.log("1 .....movement data is " + movementData);
  // waitUntil(() => hardcodedMovementData.data.length > 25)
  // .then(setMovementData(hardcodedMovementData.data));
  // console.log("2 +++++++++++++++++++++++++++movement data is " + hardcodedMovementData.data.length);
  // console.log("2 .....movement data is " + movementData);
  const [colorMapping, setColorMapping] = useState(mapAllColors(basicColorMapping));
  const [friends, setFriends] = useState(friendsData);
  const [contacts, setContacts] = useState(contactsData);
  const [emotionsData, setEmotionsData] = useState(basicToSecondary)
  const [currentEmotions, setCurrentEmotions] = useState([])
  const [length, setLength] = useState(0);
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  // const userId = uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'
const [userId, setUserId] = useState(uuid.v4());

  // function delay(time) {
  //   return new Promise(resolve => setTimeout(resolve, time));
  // }
  

  useEffect(() => {
    // loopData();
    // console.log("looped");
    // initializeMovementData();
    
    // let obj = {};
    // obj.dateEntry = date;
    // let motionEntry = {};
    // motionEntry.feelings = ["happy", "content"];
    // motionEntry.name = "placeholder";
    // motionEntry.note = "";
    // obj.motionEntry = motionEntry;
    // setUserId();
    set(ref(database, 'users/' + userId + "/" + 0), {
      dateEntry: date,
  })
    // set(ref(database, 'users/' + userId + '/0'), {
    //   dateEntry: date,
    //   // motionEntry: motionEntry,
    //   // 0: obj,
    // });
    // set(ref(database, 'users/' + userId + '/0/motionEntry/0/'), {
    //   feelings: ["happy", "content"],
    //   name: "placeholder",
    //   note: "",
    // });
  }, []);

  const accountDataRef = ref(database, "users/" + userId);
  let accountData = [];


// onValue(accountDataRef, (snapshot) => {
//   console.log("updating accountData from account");
//   let newAccountData = [];
//     const data = snapshot.val();
//       if(data) {
//         console.log("there was data " + Object.keys(data));

//         for (let i = 0; i < data.length; i++) {
//           let obj = {};
//           obj.dateEntry = data[i].dateEntry;
//           let motionEntries = [];
//           if(data[i].motionEntry) {
//               for (let j = 0; j < data[i].motionEntry.length; j++) {//there can be multiple motion entries  
//                 if(data[i].motionEntry[j]) {
//                   if (data[i].motionEntry[j].feelings && data[i].motionEntry[j].name) {
//                     let motionEntry = {};
//                     motionEntry.feelings = data[i].motionEntry[j].feelings;
//                     console.log("feelings: " + data[i].motionEntry[j].feelings);
//                     motionEntry.name = data[i].motionEntry[j].name;
//                     console.log("name: " + data[i].motionEntry[j].name);
//                     motionEntry.note = data[i].motionEntry[j].note;
//                     console.log("note: " + data[i].motionEntry[j].note);
//                     motionEntries.push(motionEntry);
//                   }
//                 }
                
//               }
//           }
//           obj.motionEntry = motionEntries;
//           newAccountData.push(obj);
//         }
//         console.log('new account data length' + newAccountData.length);
//     let newData = newAccountData.filter(x => !accountData.includes(x));
//     // accountData = [...newAccountData];
//     for(let i = 0; i < newData.length; i++) {
//       accountData.push(newData[i]);
//       console.log("accountData is now " + JSON.stringify(accountData));
//       movementData.push(newData[i]);
//     }
//     console.log(JSON.stringify(movementData));
//       }
      
    
// });





  // function initializeMovementData() {
  //   if(movementData.length === 0) {
  //     setMovementData(hardcodedMovementData.data);
  //     delay(100).then(() => initializeMovementData());

      
  //   }
  // }




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
  function deleteEmotionFromData(feeling, basic) {
    console.log(`deleting: ${feeling}`)
    emotionsData[basic].splice(emotionsData[basic].indexOf(feeling), 1)
    
  }
  function addEmotionToData (basic, secondary) {
    emotionsData[basic].push(secondary)
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
    if(term) {
      for (let i = 0; i < term.motionEntry.length; i++) {
        feelings.push(term.motionEntry[i].feelings);
      } 
    }
    
    return feelings;
  }


//   function formatDate(inputDate){
//     return `${inputDate.getMonth()+1 < 10 && '0'}${inputDate.getMonth()+1}/${inputDate.getDate()}/${inputDate.getFullYear()}` 
// }
  function updateMovement(name, feelings, movementDate) {
    // console.log("movement date pre: " + movementDate);
    // console.log("typeof: " + typeof(movementDate));
    // movementDate = formatDate(Date(movementDate));
    // console.log("movement date post: " + movementDate);
    console.log("name is ***************" + name)
    console.log(feelings)
    console.log("movement date is " + movementDate)
    let updated = [...movementData];
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

    movementDate = '0'+movementDate; //TODO: less than 10
      // set(ref(database, 'users/' + userId + "/" + 0), {
      //     dateEntry: movementDate,
      // })
      console.log("account data length is " + accountData.length);
      console.log("userid is " + userId);
      set(ref(database, 'users/' + userId + "/" + 0 + '/motionEntry/' + movementData.length), {
        feelings: feelings,
        name: name,
        note: "",
      })
      // setLength(length+1);


    
    // if((accountData[accountData.length-1].dateEntry !== ('0'+movementDate)) && (accountData[accountData.length-1].dateEntry !== (movementDate))) { //if there isn't already a movement entry for today in accountData
    //   console.log("new, accountData length is " + accountData.length);
    //   movementDate = '0'+movementDate; //TODO: less than 10
    //   set(ref(database, 'users/' + userId + "/" + accountData.length), {
    //       dateEntry: movementDate,
    //   })
    //   console.log("movement data length is " + accountData.length);
    //   set(ref(database, 'users/' + userId + "/" + (accountData.length - 1) + '/motionEntry/' + 0), {
    //     feelings: feelings,
    //     name: name,
    //     note: "",
    //   })
    // } else {
    //   console.log(accountData[accountData.length-1].dateEntry)
    //   console.log('0'+movementDate)
    //   let length = 0;
    //   console.log("accountData[accountData.length-1].motionEntry: " + accountData[accountData.length-1].motionEntry);
    //   if(accountData[accountData.length-1].motionEntry) { //if a motionEntry exists
    //     length = accountData[accountData.length-1].motionEntry.length;
    //     console.log("existing, length is " + length);
    //   }
    //   console.log(accountData.length-1)
    //   set(ref(database, 'users/' + userId + "/" + (accountData.length-1) + '/motionEntry/' + (length-1)), {
    //     feelings: feelings,
    //     name: name,
    //     note: "",
    //   })
    // }


    // if((movementData[movementData.length-1].dateEntry !== ('0'+movementDate)) && (movementData[movementData.length-1].dateEntry !== (movementDate))) { //if there isn't already a movement entry for today
    //   console.log("new, length is " + movementData.length);
    //   movementDate = '0'+movementDate; //TODO: less than 10
    //   set(ref(database, 'hardcodedMovementData/' + movementData.length), {
    //       dateEntry: movementDate,
    //   })
    //   console.log("movement data length is " + movementData.length);
    //   set(ref(database, 'hardcodedMovementData/' + (movementData.length - 1) + '/motionEntry/' + 0), {
    //     feelings: feelings,
    //     name: name,
    //     note: "",
    //   })
    // } else {
    //   console.log(movementData[movementData.length-1].dateEntry)
    //   console.log('0'+movementDate)
    //   let length = 0;
    //   console.log("movementData[movementData.length-1].motionEntry: " + movementData[movementData.length-1].motionEntry);
    //   if(movementData[movementData.length-1].motionEntry) { //if a motionEntry exists
    //     length = movementData[movementData.length-1].motionEntry.length;
    //     console.log("existing, length is " + length);
    //   }
    //   console.log(movementData.length-1)
    //   set(ref(database, 'hardcodedMovementData/' + (movementData.length-1) + '/motionEntry/' + (length-1)), {
    //     feelings: feelings,
    //     name: name,
    //     note: "",
    //   })
    // }
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
    addEmotionToData: addEmotionToData,
    deleteEmotionFromData: deleteEmotionFromData,
    movementData: movementData,

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
