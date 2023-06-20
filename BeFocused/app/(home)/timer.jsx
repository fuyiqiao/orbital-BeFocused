import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import {React} from 'react'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { renderNode } from 'react-native-elements/dist/helpers';
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import SelectDropdown from 'react-native-select-dropdown'

export default function CountDownTimer() {
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(30); 
  const [playing, setPlaying] = useState(false); 
  const durations = [10, 20, 30, 40, 50, 60];
  let set_time = 30; 

  const PauseAndQuit = () => {
    if (playing) {
      return <View style={{display: "flex", flexDirection: "row", gap: 200}}>
        <Button 
          title= "pause"
          onPress={() => setPlaying(false)}
          color="#304d6b"
        />
        <Button 
        title="quit"
        color="#304d6b"
        onPress={() => setKey(prevKey => prevKey + 1)}
        />
      </View>
    } else {
      return <View style={{display: "flex", flexDirection: "row", gap: 200}}>
        <Button 
          title= "start"
          onPress={() => setPlaying(true)}
          color="#304d6b"
        />
        <Button 
          title="quit"
          color="#304d6b"
          onPress={() => setKey(prevKey => prevKey + 1)}
        />
      </View>
    }
  }

  return(
    <View style = {styles.timerContainer}>
      <CountdownCircleTimer
        key={key}
        isPlaying={playing}
        duration={time * 60}
        size={300}
        colors={["#304d6b"]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {({ remainingTime }) => 
          {return (
            <View>
              <Text style={styles.timeDisplayContainer}>
                {Math.floor(remainingTime / 60)} min
              </Text>
              <Text style={styles.remainingContainer}>remaining</Text>
            </View>
            );}}
      </CountdownCircleTimer>
      <PauseAndQuit />
      <SelectDropdown
        data={durations}
        defaultButtonText={"set duration"}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          set_time = selectedItem
          setTime(selectedItem)
          console.log(set_time)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return <Text style={{textAlign: 'center'}}>{selectedItem} min</Text>
        }}
        rowTextForSelection={(item, index) => {
          return <Text style={{textAlign: 'center'}}>{item} min</Text>
        }}
        buttonStyle={{height: 50, width: 300, borderWidth: 1, borderColor: '#304d6b'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    color: '#304d6b', 
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  timerContainer: {
    display: "flex", 
    justifyContent: "center", 
    flexDirection: "column", 
    alignItems: "center", 
    paddingTop: 20,
    textAlign: 'center',
  }, 
  timeDisplayContainer: {
    alignItems: "center", 
    color: '#304d6b',
    fontSize: 50, 
  }, 
  remainingContainer: {
    display: "flex", 
    justifyContent: "center", 
    flexDirection: "column", 
    alignItems: "center",
    color: '#000000',
    textAlign: 'center',
  }, 
});