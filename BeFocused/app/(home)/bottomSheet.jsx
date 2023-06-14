import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Button} from 'react-native';
import { BottomSheet } from 'react-native-btr';

const App = () => {
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const openCamera = () => {};
  const deductCoin = () => {};

  return (
    <View style={styles.container}>
      <Button
        onPress={toggleBottomNavigationView}
        title="Show camera prompt"
      />
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
            <Text style={styles.title}>Break Time!</Text>
            <Text
              style={styles.subtitle}>
              Take a break and update your study timeline: open the camera app to capture your progress!            
            </Text>
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                <Text style={styles.cameraButtonText}>Open Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.snoozeButtonContainer}>
              <TouchableOpacity style={styles.snoozeButton} onPress={deductCoin}>
                <Text style={styles.snoozeButtonText}>Snooze with 1 Focus Coin</Text>
              </TouchableOpacity>
            </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
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
  snoozeButtonText: {
    color: '#304d6b',
    fontSize: 15,
  },
  title: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 30,
  },
  subtitle: {
    textAlign: 'center',
    padding: 30,
    fontSize: 17,
    color: 'grey'
  }
});