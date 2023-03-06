import { getDatabase, ref, onValue} from "firebase/database";
import database from "../config/firebase";


// const db = getDatabase();
const movementDataRef = ref(database, 'hardcodedMovementData');
let movementData = [];
onValue(movementDataRef, (snapshot) => {
    movementData.length = 0;
      const data = snapshot.val();
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.dateEntry = data[i].dateEntry;
        let motionEntries = [];
        if(data[i].motionEntry) {
            for (let j = 0; j < data[i].motionEntry.length; j++) {//there can be multiple motion entries
                let motionEntry = {};
                motionEntry.feelings = data[i].motionEntry[j].feelings;
                motionEntry.name = data[i].motionEntry[j].name;
                motionEntry.note = data[i].motionEntry[j].note;
                motionEntries.push(motionEntry);
            }
        }
        obj.motionEntry = motionEntries;
        movementData.push(obj);
      }
    //   console.log("******************************" + data[0].dateEntry);
    //   updateStarCount(postElement, data);
});


// let movementData = [

// {dateEntry: "01/4/2023", motionEntry: [{feelings: ["anxious", "dismayed"], name: "walk in the park", note: ""}, {feelings: ["anxious", "dismayed"], name: "squats 1", note: "lovely day!"}, {feelings: ["joyful", "surprised", "content", "anxious"], name: "squats 1", note: ""}]},

// {dateEntry: "01/1/2023", motionEntry: [{feelings: ["angry"], name: "11:33 1", note: ""}, {feelings: ["angry"], name: "pushups", note: "Getting my anger out!"}, {feelings: ["anxious", "interested", "joyful"], name: "pushups 2", note: ""}]},

// {dateEntry: "01/5/2023", motionEntry: [{feelings: ["angry", "bored"], name: "11:33 1", note: ""}, {feelings: ["angry", "bored"], name: "squats 1", note: "Feeling these squats!"}, {feelings: ["anxious", "excited", "eager", "sad"], name: "squats 2", note: ""}]},
// {dateEntry: "01/6/2023", motionEntry: [{feelings: ["surprised", "stunned"], name: "11:33 1", note: ""}, {feelings: ["surprised", "stunned"], name: "bear crawls 1", note: "Feeling these in my core"}, {feelings: ["joyful", "playful"], name: "bear crawls 2", note: ""}]}, 

// {dateEntry: "01/7/2023", motionEntry: [{feelings: ["surprised", "shocked"], name: "11:33 1", note: ""}, {feelings: ["shocked", "joyful"], name: "step-ups 1", note: "These step-ups are intense!"}, {feelings: ["joyful", "powerful", "playful", "surprised"], name: "step-ups 2", note: ""}]},

// {dateEntry: "01/9/2023", motionEntry: [{feelings: ["sad", "small"], name: "11:30 1", note: ""}, {feelings: ["sad", "anxious", "melancholy"], name: "med-ball slams 1", note: "Feeling calmer after these slams."}, {feelings: ["surprised", "joyful", "peaceful"], name: "med-ball slams 2", note: ""}]},
// {dateEntry: "01/12/2023", motionEntry: [{feelings: ["joyful"], name: "11:30 1", note: ""}, {feelings: ["sad"], name: "squats 1", note: "Feeling a little down"}, {feelings: ["sad", "discouraged", "hurt"], name: "squats 2", note: ""}]},
// {dateEntry: "01/15/2023", motionEntry: [{feelings: ["anxious", "eager", "stressed"], name: "11:30 1", note: ""}, {feelings: ["anxious", "stressed"], name: "squats 1", note: "Feeling more excited during these!"}, {feelings: ["anxious", "exctied", "interested"], name: "squats 2", note: ""}]},

// {dateEntry: "01/18/2023", motionEntry: [{feelings: ["angry", "frustrated", "dismayed"], name: "11:30 1", note: ""}, {feelings: ["angry", "dismayed", "discouraged"], name: "squats 1", note: "Not feeling great after these :("}, {feelings: ["sad", "angry"], name: "squats 2", note: ""}]},
// {dateEntry: "01/20/2023", motionEntry: [{feelings: ["joyful"], name: "11:30 1", note: ""}, {feelings: ["anxious", "stressed"], name: "squat jumps 1", note: "These are making me feel strong!"}, {feelings: ["joyful", "powerful"], name: "squat jumps 2", note: ""}]},
// {dateEntry: "01/21/2023", motionEntry: [{feelings: ["angry"], name: "11:30 1", note: ""}, {feelings: ["sad"], name: "breathing 1", note: "Feeling motivated!"}, {feelings: ["sad", "hurt"], name: "breathing 2", note: ""}]},
// {dateEntry: "01/25/2023", motionEntry: [{feelings: ["surprised", "stunned"], name: "11:30 1", note: ""}, {feelings: ["surprised", "stunned", "amazed"], name: "squats 1", note: "Losing some energy after these squats"}, {feelings: ["joyful", "peaceful", "content"], name: "squats 2", note: ""}]},

// {dateEntry: "01/27/2023", motionEntry: [{feelings: ["joyful", "sad"], name: "11:30 1", note: ""}, {feelings: ["angry", "sad"], name: "lunges 1", note: "These are a good warm up!"}, {feelings: ["anxious", "surprised"], name: "lunges 2", note: ""}]},
// {dateEntry: "01/29/2023", motionEntry: [{feelings: ["angry", "sad"], name: "11:30 1", note: ""}, {feelings: ["angry", "sad", "discouraged", "aggressive"], name: "squats 1", note: "Feeling these squats!"}, {feelings: ["anxious", "surprised", "eager"], name: "squats 2", note: ""}]},
// {dateEntry: "12/2/2022", motionEntry: [{feelings: ["sad", "discouraged"], name: "11:33 1", note: ""}, {feelings: ["angry", "aggressive", "frustrated"], name: "yoga 1", note: "Yoga was a great warm up!"}, {feelings: ["anxious", "excited"], name: "yoga 2", note: ""}]},
// {dateEntry: "12/5/2022", motionEntry: [{feelings: ["joyful"], name: "11:33 1", note: ""}, {feelings: ["joyful"], name: "treadmill 1", note: "Ready for the rest of my workout!"}, {feelings: ["anxious", "eager"], name: "treadmill 2", note: ""}]},




// ]

export default movementData;
