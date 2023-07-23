import { React, useEffect, useState } from 'react';
import { Button, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useAuth } from "../contexts/auth";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [username, setUsername] = useState(''); 
  const [userEmail, setUserEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [refreshing, setRefreshing] = useState(false);
  const [profilePicture, setProfilePicture] = useState('')
  const [isUploaded, setIsUploaded] = useState(false);

  async function fetchUsername() {
    setRefreshing(true);
    let { data, error } = await supabase.from('profiles').select('username').eq('id', user.id);
    setRefreshing(false);
    if (error) {
      console.log(error);
      return;
    }
    let { username:temp } = data[0]; 
    setUsername(temp); 
  }

  async function fetchProfilePicture() {
    setRefreshing(true);
    let { data, error } = await supabase.from('profiles').select('avatar_url').eq('id', user.id);
    setRefreshing(false);
    if (error) {
      console.log(error);
      return;
    }
    let { avatar_url:temp } = data[0]; 
    setProfilePicture(temp); 
  }

  useEffect(() => {
    fetchUsername();
    fetchProfilePicture();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchUsername();
      fetchProfilePicture();
      setRefreshing(false);
    }
  }, [refreshing]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
      setIsUploaded(true);
    }
  }; 

  const handleSubmit = async () => {
    let imageURL = profilePicture;
    if (isUploaded) {
      const { data, storageError } = await supabase.storage.from('avatars').upload(`${new Date().getTime()}`, { uri: profilePicture, type: 'jpg', name: 'name.jpg' });
      if (storageError != null) {
        console.log(storageError);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);
      imageURL = publicUrl;
      console.log(imageURL); 
    }
    
    const { error:profilesInsertError } = await supabase.from('profiles').update({ 
        updated_at: new Date().toISOString(),
        username: username, 
        avatar_url: imageURL, 
      }).eq('id', user.id);
    if (profilesInsertError != null) {
      console.log("Profile table update error:" + profilesInsertError);
      return;
    }

    const { error:postsInsertError } = await supabase.from('posts').update({ 
      username: username, 
      avatar_url: imageURL, 
    }).eq('creator_id', user.id);

    if (postsInsertError != null) {
      console.log(postsInsertError);
      return;
    }

    router.back()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => {router.back()}}>
            <View style={styles.backButtonContainer}>
              <Image source={require('../assets/back.png')} resizeMode='contain' style={styles.icon}/>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Edit Profile</Text>
        <Image style={styles.image} source={{ url: profilePicture }}></Image>
        <View style={styles.selectPhotosButtonBox}>
          <Button title="Select image from photo library" onPress={pickImage} />
        </View>
        <View style={styles.usernameInputBox}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            textContentType='username'
            placeholder="Username"
            placeholderTextColor='#b2b4b3'
            value={username}
            onChangeText={setUsername} 
            mode='outlined'
            outlineColor="#d7d8d8"/>
        </View>
        <View style={styles.submitBox}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  }, 
  image: { 
    position:'absolute',
    top: '17%',
    width: 160, 
    height: 160, 
    borderRadius: 90,
    borderWidth: 2,
    borderColor:'black',
    alignSelf:'center',
  }, 
  title: {
    position: 'absolute',
    top: '8%',
    alignSelf: 'center',
    fontSize: 30
  },
  submitBox: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: '5%'
  },
  usernameInputBox: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '5%',
    top: '48%', 
  },
  input: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#304d6b',
    borderRadius: 40,
    padding: 15
  },
  buttonText: {
    color: 'white'
  },
  selectPhotosButtonBox: {
    position: 'absolute',
    top:'39%', 
    alignSelf: 'center'
  },
  backContainer: {
    position:'absolute',
    top:'9%',
    left: '5%',
  },
  backButtonContainer: {
    width: 20,
    height: 20
  },
  icon: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});