import { getDatabase, ref, onValue} from "firebase/database";
import database from "../config/firebase";

const movementDataRef = ref(database, 'hardcodedMovementData');
let motionData = {};
onValue(movementDataRef, (snapshot) => {
  console.log("updating motionData");
  const data = snapshot.val();
  for (let i = 0; i < data.length; i++) {
    if(data[i].motionEntry) { //loop through every place where movements are recorded
      for (let j = 0; j < data[i].motionEntry.length; j++) {//there can be multiple motion entries  
        if (data[i].motionEntry[j].feelings && data[i].motionEntry[j].name) {
          for (let k = 0; k < data[i].motionEntry[j].feelings.length; k++) {//loop through every feeling and make sure it's in motionData
            let currentEmotion = data[i].motionEntry[j].feelings[k];
            if(!motionData[currentEmotion]) {//if there is not already an entry in motionData (the big one) for the currentEmotion in question
              let associatedMovements = {};
              associatedMovements[data[i].motionEntry[j].name] = 1;
              motionData[currentEmotion] = associatedMovements;
            } else { //if motionData already has an entry for this currentEmotion
                if (motionData[currentEmotion][data[i].motionEntry[j].name]) { //if this movement has already been associated with this emotion
                    let x = motionData[currentEmotion][data[i].motionEntry[j].name];
                    motionData[currentEmotion][data[i].motionEntry[j].name] = x+1;
                } else {
                    motionData[currentEmotion][data[i].motionEntry[j].name] = 1;
                }
            }
          }
        }
      }
    }
  }
  console.log("motionData: " + JSON.stringify(motionData));
});


// const motionData = {
//     "joyful": {
//        "walk to University Ave": 5,
//        "dance class at Roble Gym": 4,
//        "strength training": 3,
//        "jog around Lake Lag": 2,
//     },
//     "anxious": {
//         "walk to University Ave": 5,
//         "solo hike": 4,
//         "lifting": 3,
//         "meditate": 2,
//     },
//     "content": {
//         "walk to University Ave": 5,
//         "go climbing at Farrillaga": 4,
//     },
//     "sad": {
//         "dance class at Roble Gym": 5,
//         "cardio": 4,
//         "walk down Palm Drive": 3,
//         "yoga": 2,
//     },
//     "peaceful": {
//         "dance class at Roble Gym": 5,
//         "strength training": 4,
//         "go climbing at Farrillaga": 3,
//     },
//     "angry": {
//         "hike with friends": 5,
//         "solo hike" : 4,
//         "lifting": 3,
//         "bike up and down El Camino": 2,
//         "meditate": 1,
//     },
//     "surprised": {
//         "hike with friends": 5,
//         "cardio": 4,
//         "jog around Lake Lag": 3,
//         "swim": 2,
//         "go bowling": 1,
//     },
//     "amazed": {
//         "hike with friends": 5,
//         "go climbing at Farrillaga": 4,
//     },
//     "frustrated": {
//         "solo hike": 5,
//         "meditate": 4,
//         "go bowling": 3,
//     },
//     "playful": {
//         "strength training": 5,
//         "go bowling": 4,
//         "dance around the room": 3,
//     },
//     "aggressive": {
//         "lifting": 5,
//         "bike up and down El Camino": 4,
//     },
//     "discouraged": {
//         "cardio": 5,
//         "walk down Palm Drive": 4,
//         "yoga": 3,
//         "dance around the room": 2,
//     },
//     "shocked": {
//         "jog around Lake Lag": 5,
//         "swim": 4,
//     },
//     "eager": {
//         "bike up and down El Camino": 5,
//         "meditate": 4,
//     },
//     "melancholy": {
//         "walk down Palm Drive": 5,
//         "yoga": 4,
//     },
//     "small": {
//         "walk down Palm Drive": 5,
//         "yoga": 4,
//     },
//     "powerful": {
//         "swim": 5,
//     },
//     "stunned": {
//         "swim": 5,
//         "go climbing at Farrillaga": 4,
//     },
//     "interested": {
//         "play tennis with Ethan": 5,
//     },
//     "hurt": {
//         "play tennis with Ethan": 5,
//     },
//     "frightened": {
//         "play tennis with Ethan": 5,
//     },
//     "dismayed": {
//         "go bowling": 5,
//     },
//     "bored": {
//         "dance around the room": 5,
//     },
// }

export default motionData;
