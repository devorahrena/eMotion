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
        if (data[i].motionEntry[j].feelings && (data[i].motionEntry[j].name !== "")) {
          for (let k = 0; k < data[i].motionEntry[j].feelings.length; k++) {//loop through every feeling and make sure it's in similarEmotions
            let primaryEmotion = data[i].motionEntry[j].feelings[k];
            if(!similarEmotions[primaryEmotion]) {//if there is not already an entry in similarEmotions (the big one) for the primaryEmotion in question
              for (let m = 0; m < data[i].motionEntry[j].feelings.length; m++) {//for each of the associated feelings, create an object
                if (data[i].motionEntry[j].feelings[m] !== primaryEmotion) {
                  let obj = {}
                  let associatedMovements = [];
                  associatedMovements.push(data[i].motionEntry[j].name);
                  obj[data[i].motionEntry[j].feelings[m]] = associatedMovements;
                  similarEmotions[primaryEmotion] = obj;
                }
              }
            // }
            } else { //if similarEmotions already has an entry for this primaryEmotion
              for (let m = 0; m < data[i].motionEntry[j].feelings.length; m++) {//for each of the associated feelings, update the object
                if(data[i].motionEntry[j].feelings[m] !== primaryEmotion) {
                  let obj = similarEmotions[primaryEmotion];
                  if(obj[data[i].motionEntry[j].feelings[m]]) { //if this secondary feeling has already been associated with the primary one
                    let associatedMovements = obj[data[i].motionEntry[j].feelings[m]];
                    if (!associatedMovements.includes(data[i].motionEntry[j].name)) { //as long as this movement name is not already associated
                      similarEmotions[primaryEmotion][data[i].motionEntry[j].feelings[m]].push(data[i].motionEntry[j].name);
                      // console.log("movement name is not already associated");
                    }
                  } else { //if this secondary feeling has NOT been associated with the primary one
                    //ie, secondary emotion is "joyful" and primary is "peaceful" and the object looks like:
                    //peaceful: {"powerful": ['went on walk', 'other activity']}
                    // console.log("secondary feeling has NOT been associated with the primary one");
                    let associatedMovements = [];
                    associatedMovements.push(data[i].motionEntry[j].name);
                    obj[data[i].motionEntry[j].feelings[m]] = associatedMovements;
                    similarEmotions[primaryEmotion] = obj;
                  }
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


//{peaceful: {"powerful": ['went on walk', 'other activity'], "joyful": ["meditated"]}}
//similarEmotions[primaryEmotion] returns an object
//similarEmotions[primaryEmotion][secondaryEmotion] returns an array of movements

export default similarEmotions;
