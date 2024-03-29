import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { React, useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter, Link } from 'expo-router';
import { BottomSheet } from 'react-native-btr';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import SelectDropdown from 'react-native-select-dropdown'
import { useAuth } from "../../contexts/auth";

export default function TimerPage() {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const [time, setTime] = useState(1);

  const getDuration = () => {
    return (time);
  }

  const CountDownTimer = () => {
    const [key, setKey] = useState(0);
    const [start, setStart] = useState(0); 
    const [end, setEnd] = useState(0); 
    const [playing, setPlaying] = useState(false); 
    const [quit, setQuit] = useState(false); 
    const durations = [1, 5, 10, 15, 20, 30, 40, 50, 60, 75, 90, 120];
    let set_time = 1; 

    const logSession = async () => {
      const { error } = await supabase.from('sessions').insert({ 
        user_id: user.id, 
        start_time: start, 
        end_time: new Date().toISOString(), 
        coins_earned: time, 
        status: "Completed"
      }).select().single();
      if (error != null) {
        console.log(error);
        return;
      }
      console.log(start, end, "Completed"); 
    }

    const logQuitSession = async () => {
      const { error } = await supabase.from('sessions').insert({ 
        user_id: user.id, 
        start_time: start, 
        end_time: new Date().toISOString(), 
        coins_earned: 0, 
        status: "Quit"
      }).select().single();
      if (error != null) {
        console.log(error);
        return;
      }
      console.log(start, end, "quit"); 
    }
  
    const PauseAndQuit = () => {
      if (playing) {
        return <View style={{display: "flex", flexDirection: "row", gap: 200}}>
          <Button 
            title= "Pause"
            onPress={() => {setPlaying(false)}}
            color="#304d6b"
          />
          <Button 
          title="Quit"
          color="#304d6b"
          onPress={() => {
            setPlaying(false), 
            setKey(prevKey => prevKey + 1), 
            setEnd(new Date().toLocaleString()), 
            setQuit(true), 
            logQuitSession()}}
          />
        </View>
      } else {
        return <View style={{display: "flex", flexDirection: "row", gap: 200}}>
          <Button 
            title= "Start"
            onPress={() => {
              setPlaying(true), 
              setStart(new Date().toISOString()), 
              setQuit(false)}}
            color="#304d6b"
          />
          <Button 
            title="Quit"
            color="#304d6b"
            onPress={() => {setKey(prevKey => prevKey + 1)}}
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
          onComplete={() => {
            logSession(); 
            return ({ shouldRepeat: false, delay: 1 })
          }}
        >
          {({ remainingTime }) => { 
            useEffect(() => {
              if (remainingTime == 0) {
                setVisible(true);
              }
            });
            
            if (remainingTime % 60 < 10) {
              return (
                <View>
                  <Text style={styles.timeDisplayContainer}>
                    {Math.floor(remainingTime / 60)}:0{remainingTime % 60}
                  </Text>
                  <Text style={styles.remainingContainer}>remaining</Text>
                </View> 
              ); 
            } else {
              return (
                <View>
                  <Text style={styles.timeDisplayContainer}>
                    {Math.floor(remainingTime / 60)}:{remainingTime % 60}
                  </Text>
                  <Text style={styles.remainingContainer}>remaining</Text>
                </View> 
              ); 
            }}}
        </CountdownCircleTimer>
        <PauseAndQuit />
        <SelectDropdown
          data={durations}
          defaultButtonText={"Set Focus Duration"}
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
          buttonStyle={{marginTop :20, height: 45, width: 320, borderWidth: 1, borderColor: '#304d6b', borderRadius: 30}}
        />
      </View>
    );
  }

  const CameraPrompt = () => {
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };
    const dismissPrompt = () => {
      setVisible(!visible);
      deductCoins(); 
    };
    const goToCamera = () => {
      setVisible(!visible);
      addCoins(); 
    }

    const deductCoins = async () => {
      const { error } = await supabase.from('profiles').update({ coin_count: coins - 5 }).eq('id', user.id); 
      if (error != null) {
        console.log(error);
        return;
      }
      console.log(coins, "deducted"); 
    }

    const addCoins = async () => {
      const { error } = await supabase.from('profiles').update({ coin_count: coins + time }).eq('id', user.id); 
      if (error != null) {
        console.log(error);
        return;
      }
      console.log(coins, "added"); 
    }
  
    return (
      <View style={styles.bottomNavigationContainer}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <Text style={styles.promptTitle}>Focus Complete!</Text>
            <Text
              style={styles.subtitle}>
              Update your focus timeline: open the camera to capture your progress!            
            </Text>
            <View style={styles.cameraButtonContainer}>
              <Link href='../camera' asChild>
                <TouchableOpacity style={styles.cameraButton} onPress={goToCamera}>
                <Text style={styles.cameraButtonText}>Open Camera</Text>
              </TouchableOpacity>
              </Link>
            </View>
            <View style={styles.snoozeButtonContainer}>
              <TouchableOpacity style={styles.snoozeButton} onPress={dismissPrompt}>
                <Text style={styles.dismissButtonText}>Dismiss with 5 Focus Coins</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  };

  const [todaysSessions, setSessions] = useState([]);
  const [coins, setCoins] = useState(0); 
  const [refreshing, setRefreshing] = useState(false);
  const [refreshCoins, setRefreshCoins] = useState(false); 

  async function fetchSessions() {
    const currDate = new Date().toDateString(); 
    setRefreshing(true);
    let { data, error } = await supabase.from('sessions').select('start_time, end_time, status').eq('user_id', user.id).gte('start_time', currDate).order('start_time', {ascending: false});
    setRefreshing(false);
    if (error != null) {
      console.log(error);
      return;
    }
    setSessions(data);
    console.log(todaysSessions); 
  }

  async function fetchCoins() {
    setRefreshCoins(true);
    let { data, error } = await supabase.from('profiles').select('coin_count').eq('id', user.id);
    setRefreshCoins(false);
    if (error != null) {
      console.log(error);
      return;
    }
    let { coin_count:temp } = data[0];
    setCoins(temp); 
    console.log(coins); 
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchSessions();
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (refreshCoins) {
      fetchCoins();
      setRefreshCoins(false);
    }
  }, [refreshCoins]);

  const OneSession = ({data}) => {
    let {start_time: rawStartTime, end_time: rawEndTime, status: stat} = data; 
    const c = { time: rawStartTime };
    const startTime = (new Date(c.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})); 
    const d = { time: rawEndTime }; 
    const endTime = (new Date(d.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})); 
    return(
        <View style={styles.singleSessionContainer2}>
            <View style={styles.circle} />
            <View style={styles.singleSessionContainer}>
                <Text>{startTime} - {endTime} </Text>
                <Text>{stat}</Text>
            </View>
        </View>
    ); 
  }; 

  const TodaysLogs = () => {
    const display = []; 
    for (let i = 0; i < todaysSessions.length; i++) {
      display.push(<OneSession data={todaysSessions[i]} />)
    }
    return(
      <View>
        {display}
      </View>
    ); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <CountDownTimer/>
      <CameraPrompt/>
      <Text style = {styles.subtitle}>Today's Sessions</Text>
      <ScrollView>
        <TodaysLogs/>
      </ScrollView>
    </SafeAreaView> 
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  bottomNavigationContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavigationView: {
    backgroundColor: 'white',
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: '20',
    borderTopLeftRadius:'20',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cameraButtonContainer: {
    flex: 1,
    width: 330
  },
  snoozeButtonContainer: {
    flex: 1,
  },
  cameraButton: {
    backgroundColor: '#304d6b',
    borderRadius: 40,
    height: 50,
  },
  snoozeButton: {
    alignItems: 'center',
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 19,
    textAlign:'center',
    paddingTop: 12
  },
  dismissButtonText: {
    color: '#304d6b',
    fontSize: 17,
  },
  promptTitle: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 30,
  },
  subtitle: {
    textAlign: 'center',
    padding: 30,
    fontSize: 18,
    color: 'grey', 
  },
  timerContainer: {
    display: "flex", 
    justifyContent: "center", 
    flexDirection: "column", 
    alignItems: "center", 
    paddingTop: 60,
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
  dropdownContainer: {
    position:'absolute',
    top: '80%'
  }, 
  singleSessionContainer: {
    display: "flex", 
    flexDirection: "row", 
    gap: 70, 
    padding: 10,
  }, 
  singleSessionContainer2: {
    display: "flex", 
    flexDirection: "row", 
    gap: 5, 
    padding: 10, 
    alignItems: "baseline", 
  }, 
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: "#304d6b",
  },
});