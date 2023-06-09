import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = () => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display the selected date */}
      <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>{date.toUTCString()}</Text>
      </View>

      {/* The button that used to trigger the date picker */}
      {!isPickerShow && (
        <View style={styles.btnContainer}>
          <Button title="choose your duration" color="#304d6b" onPress={showPicker} />
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
        <Button title="done" color="#304d6b"/>
      )}
    </View>
  );
}; 

const CountdownDisplay = () => {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    var date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
    var expirydate = '2023-12-23 04:00:45'; //You can set your own date-time
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    setTotalDuration(40);
  }, []);

  return (
    <CountDown
      until={totalDuration}
      timetoShow={('H', 'M', 'S')}
      onFinish={() => alert('finished')}
      onPress={() => alert('hello')}
      size={30}
      digitStyle={{backgroundColor: '#304d6b'}}
      digitTxtStyle={{color: '#f0f0f0'}}
    />
  ); 
}

export default function TimerPage() {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    var date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
    var expirydate = '2023-12-23 04:00:45'; //You can set your own date-time
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    setTotalDuration(40);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>
        Take charge of your productivity!
      </Text>
      <CountdownDisplay/>
      <TimePicker/>
    </View>
    </SafeAreaView> 
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});