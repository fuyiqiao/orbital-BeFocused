import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button } from 'react-native-paper';
import { blankProfile } from '../.././assets/blankProfile.png'; 

const ProfilePhoto = () => {
  return (
    <View style={styles.photoContainer}>
      <Image style={styles.photo} source={require('../../assets/sampleProfilePicture.png')} 
      />
    </View>
  );
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
}

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <View style={styles.topColour}></View>
      <View style={styles.bottomColour}></View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity  onPress={() => supabase.auth.signOut()}>
          <Text >Settings</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <ProfilePhoto/>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>Ballsorter</Text>
        <Text style={styles.coinsText}>Focus Coins: 100</Text>
      </View>
      
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
  topColour: {
    flex: 2,
    backgroundColor: '#304d6b'
  },
  bottomColour: {
    flex: 6,
    backgroundColor: 'white'
  },
  photoContainer: {
    position:'absolute',
    width: '100%',
    height: '38%',
    justifyContent: 'center',
    alignItems:'center',
    shadowColor:'grey',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3
  },
  photo: { 
    width: 165, 
    height: 165, 
    borderRadius:100,
    borderWidth: 3,
    borderColor:'white',
    alignSelf:'center',
  }, 
  buttonsContainer: {
    flexDirection: 'row',
    position:'absolute',
    width: '100%',
    height: '12%',
    alignItems:'center',
    justifyContent:'space-between',
    padding: 20
  },
  button: {
    borderRadius: '50%',
    height: 30,
    width: 65,
  },
  usernameContainer: {
    flexDirection: 'column',
    position:'absolute',
    width: '100%',
    height: '81%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  usernameText: {
    fontSize: 38,
  },
  coinsText: {
    fontSize: 19,
    paddingTop: 10,
    color: 'dimgrey'
  },
  buttonText: {
    color:'white',
    fontSize: 16
  },
})