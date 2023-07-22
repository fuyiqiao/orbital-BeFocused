import { React, useEffect, useState } from 'react';
import { Button, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useAuth } from "../contexts/auth";

export default function CreateProfilePage() {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState('https://zgthnszoxpnuentossny.supabase.co/storage/v1/object/public/avatars/default_avatar.jpeg');
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState(user.email);
  const [refreshing, setRefreshing] = useState(false);

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
    }
  }; 

  const handleSubmit = async () => {
    let uploadedImage = null;
    const { data, storageError } = await supabase.storage.from('avatars').upload(`${new Date().getTime()}`, { uri: profilePicture, type: 'jpg', name: 'name.jpg' });
    if (storageError != null) {
      console.log(storageError);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);
    uploadedImage = publicUrl;
    console.log(uploadedImage); 
    
    const { error:insertError } = await supabase.from('profiles').update({ 
      updated_at: new Date().toISOString(),
      username: username, 
      avatar_url: uploadedImage, 
      full_name: null,
      email: userEmail, 
      coin_count: 10
    }).eq('id', user.id);

    if (insertError != null) {
      console.log(insertError);
      return;
    }
    router.push('/(home)/feed')
  }

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={50} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Profile</Text>
          <Image style={styles.image} source={{ uri: profilePicture }}></Image>
          <View style={styles.selectPhotosButtonBox}>
            <Button title="Select image from photo library" onPress={pickImage} />
          </View>
          <View style={styles.inputBox}>
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
              <Text style={styles.buttonText}>Create New Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  }, 
  
  image: { 
    position:'absolute',
    top: '18%',
    width: 160, 
    height: 160, 
    borderRadius: 90,
    borderWidth: 2,
    borderColor:'black',
    alignSelf:'center',
  }, 
  title: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    fontSize: 35
  },
  submitBox: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: '5%'
  },
  inputBox: {
    position: 'absolute',
    top: '47%',
    width: '100%',
    paddingHorizontal: '5%'
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
    top:'40%', 
    alignSelf: 'center'
  },
  input: {
    backgroundColor: '#f0f0f0',
  },
});