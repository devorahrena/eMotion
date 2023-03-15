import { Text, View, StyleSheet } from 'react-native';
import FeelingContext from './FeelingContext.js';
import { useContext, useState, useEffect } from 'react';
import Timeline from 'react-native-timeline-flatlist';

export default function EmotionTimeline({movementDataProp}) {
    const context = useContext(FeelingContext);
    const [data, setData] = useState([])
    const timelineProps = {
      circleColor: '#aaa',
      lineColor: '#aaa',
      circleSize: 10,
      detailContainerStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10
      }

    };

      useEffect(() => {
        var temp = []
        var firstItem = { title: 'Started the Day!', description: ':)'}
        if (movementDataProp){
          var movementData = movementDataProp.motionEntry
          for (var entry of movementData) {
            if(entry.name.charAt(entry.name.length - 2) === " ") {
              entry.name = entry.name.slice(0,-2);
           }
            temp.push({title: entry.feelings.join(', '), description: entry.name.length > 2 && `from ${entry.name}`, circleColor: context.colorMapping[entry.feelings[0]], lineColor: context.colorMapping[entry.feelings[0]]})
          }
          temp.push(firstItem)
          setData(temp)
        }
      }, [])
    return (
        <View style={{margin: 20}}>
          <Timeline {...timelineProps} data={data}/> 
        </View>
    );
}

const styles = StyleSheet.create({
  text: { 
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10
  },
  clickText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '200'
  },
  pulse: {
    position: 'absolute',
  }
});
