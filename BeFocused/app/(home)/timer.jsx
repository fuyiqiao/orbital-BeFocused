import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { renderNode } from 'react-native-elements/dist/helpers';

const TimePicker = () => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date('2023-06-09T00:00:00'));
  const [inProgress, setInProgress] = useState(false); 

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const hidePicker = () => {
    setIsPickerShow(false); 
    setInProgress(true); 
  }; 

  return (
    <View style={styles.container}>
      
      {!inProgress &&
        <Text>hello</Text>
        // <CountdownDisplay />
      }
      {inProgress && 
        <CountdownDisplay duration={new Number(date.getHours()*60*60 + date.getMinutes()*60)}/>
      }

      {/* Display the selected duration */}
      <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>
          session length: {date.getHours()}h {date.getMinutes()}min
        </Text>
      </View>

      {/* The button that used to trigger the date picker */}
      {!isPickerShow && (
        <View style={styles.btnContainer}>
          <Button title="start a new session" color="#304d6b" onPress={showPicker} />
        </View>
      )}

      {/* The duration picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={Platform.OS === 'ios' ? 'countdown' : 'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
      {isPickerShow && (
        <Button title="start now!" color="#304d6b" onPress={hidePicker} />
      )}
    </View>
  );
}; 

const CountdownDisplay = ({duration}) => {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    setTotalDuration(duration);
    renderNode(); 
  }, []);

  return (
    <CountDown
      until={new Number(totalDuration)}
      timetoShow={('H', 'M', 'S')}
      onFinish={() => alert('session completed')}
      onPress={() => alert('not yet :(')}
      size={30}
      digitStyle={{backgroundColor: '#304d6b'}}
      digitTxtStyle={{color: '#f0f0f0'}}
    />
  ); 
}

export default function TimerPage() {
  const [totalDuration, setTotalDuration] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>
        Take charge of your productivity!
      </Text>
      <TimePicker/>
    </View>
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
  pickedDate: {
    textAlign: 'center',
    fontSize: 15,
    padding: 15,
  },
});