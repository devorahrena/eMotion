import blend_colors from '../blend_colors';

const basicColorMapping = {
  "joyful": "#FDEF8F",
  "anxious":"#F19998",
  "angry":"#CB9AF9",
  "sad":"#98ec9d",
  "surprised":"#f4b289",
};

function mapAllColors(basicColorMapping) {
  colorMapping = basicColorMapping;

  colorMapping["content"] = '#FADC8D';
  colorMapping["peaceful"] = "#FCE98F";
  colorMapping["playful"] = "#F9D48E";
  colorMapping["powerful"] = "#FBE5A5";

  colorMapping["stressed"] = "#F4B296";
  colorMapping["eager"] = "#E89FA7";
  colorMapping["interested"] = "#F2A196";
  colorMapping["excited"] = "#EB98B6";

  colorMapping["dismayed"] = "#D89ADF";
  colorMapping["aggressive"] = "#D29AF4";
  colorMapping["bored"] = "#c4a2f3";
  colorMapping["frustrated"] = "#b8b2e3";

  colorMapping["hurt"] = "#a6d0ba";
  colorMapping["discouraged"] = "#9be2a6";
  colorMapping["melancholy"] = "#a3e69e";
  colorMapping["small"] = "#b4dc98";

  colorMapping["amazed"] = "#d8c38f";
  colorMapping["stunned"] = "#f2bb90";
  colorMapping["shocked"] = "#f4b78d";
  colorMapping["frightened"] = "#f6c68f";
  
  return colorMapping;
}

let colorMapping = mapAllColors(basicColorMapping);



const basicFeelings = ['joyful', 'anxious', 'angry', 'sad', 'surprised'];

const basicToSecondary = {"joyful": ["content","peaceful","playful","powerful"], 
                        "anxious": ["stressed","eager","interested","excited"],
                        "angry": ["dismayed","aggressive","bored","frustrated"],
                        "sad": ["hurt","discouraged","melancholy","small"],
                        "surprised": ["amazed","stunned","shocked","frightened"],};
                        
export { colorMapping, basicColorMapping, mapAllColors, basicFeelings, basicToSecondary };