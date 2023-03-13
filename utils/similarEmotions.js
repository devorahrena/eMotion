import { getDatabase, ref, onValue} from "firebase/database";
import database from "../config/firebase";

const movementDataRef = ref(database, 'hardcodedMovementData');
let similarEmotions = {};
onValue(movementDataRef, (snapshot) => {
  console.log("updating similarEmotions");
  const data = snapshot.val();
  for (let i = 0; i < data.length; i++) {
    if(data[i].motionEntry) { //loop through every place where feelings are recorded
      for (let j = 0; j < data[i].motionEntry.length; j++) {//there can be multiple motion entries  
        if (data[i].motionEntry[j].feelings) {
          for (let k = 0; k < data[i].motionEntry[j].feelings.length; k++) {//loop through every feeling and make sure it's in similarEmotions
            let primaryEmotion = data[i].motionEntry[j].feelings[k];
            if(!similarEmotions[primaryEmotion]) {//if there is not already an entry in similarEmotions (the big one) for the primaryEmotion in question
              let associatedEmotions = [];
              for (let m = 0; m < data[i].motionEntry[j].feelings.length; m++) {
                if (data[i].motionEntry[j].feelings[m] !== primaryEmotion) {
                  associatedEmotions.push(data[i].motionEntry[j].feelings[m]);
                }
              }
              similarEmotions[primaryEmotion] = associatedEmotions;
            } else { //if similarEmotions already has an entry for this primaryEmotion
              for (let m = 0; m < data[i].motionEntry[j].feelings.length; m++) {
                if ((data[i].motionEntry[j].feelings[m] !== primaryEmotion) && (!similarEmotions[primaryEmotion].includes(data[i].motionEntry[j].feelings[m]))) {
                    similarEmotions[primaryEmotion].push(data[i].motionEntry[j].feelings[m]);
                }
              }
            }
          }
        }
      }
    }
  }
  console.log("similar emotions: " + JSON.stringify(similarEmotions));
});

export default similarEmotions;