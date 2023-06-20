import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button, Modal } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import moment from 'moment';
import {React} from 'react'; 
import { Link } from "expo-router";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import SelectDropdown from 'react-native-select-dropdown'

export default function CountDownTimer() {
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(30); 
  const [playing, setPlaying] = useState(false); 
  const [showModal, setShowModal] = useState(true);
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

  const CameraPrompt = () => {
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}>
        <View
          style={{
            height: '35%',
            marginTop: 'auto',
            backgroundColor:'white'
          }}>
          <Text style={styles.title}>Break Time!</Text>
          <Text style={styles.breakTimeText}>Take a break and update your study timeline! Open the camera app and show your progress</Text>
          <View style={styles.dismissButton}>
            <Link href="/camera">
              <View style={styles.openCameraButton}>
                <Text>Open Camera</Text>
              </View>
            </Link>
          </View>
          
          <View>
            <Button
              title="Snooze with 1 Focus Coin"
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
    ); 
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
          { if (remainingTime == 590) {
              setShowModal(true)
            }
            
            if (remainingTime % 60 < 10) {
            return (
              <View>
                <Text style={styles.timeDisplayContainer}>
                  {Math.floor(remainingTime / 60)}:0{remainingTime % 60}
                </Text>
                <Text style={styles.remainingContainer}>remaining</Text>
              </View> ); 
          } else {
            return (
              <View>
                <Text style={styles.timeDisplayContainer}>
                  {Math.floor(remainingTime / 60)}:{remainingTime % 60}
                </Text>
                <Text style={styles.remainingContainer}>remaining</Text>
              </View> ); 
          }}}
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
      <CameraPrompt />
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
    padding: 15,
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
  dismissButton: {
    alignItems: 'center',
    backgroundColor: '#304d6b',
    borderRadius: 40,
    color: '#FFFFFF', 
    width: 300, 
    justifyContent: 'center',
  },
  breakTimeText: {
    textAlign: 'center',
    fontSize: 13,
    padding: 20,
  }, 
  openCameraButton: {
    color: '#FFFFFF', 
    height: 20, 
  }
});