import { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { useRouter } from "expo-router";
import { supabase } from '../lib/supabase';
import { useAuth } from "../contexts/auth";

export default function CameraPage() {
  const [cameraPermission, setCameraPermission] = useState(false)
  const [image, setImage] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState(false)
  const cameraRef = useRef(null);
  const { user } = useAuth();
  const [currUser, setUser] = useState(''); 
  const [refreshing, setRefreshing] = useState(false);

  async function fetchUsername() {
    setRefreshing(true);
    let { data, error } = await supabase.from('profiles').select('username').eq('id', user.id);
    setRefreshing(false);
    if (error) {
      console.log(error);
      return;
    }
    let { username:temp } = data[0]; 
    setUser(temp); 
  }

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchUsername();
      setRefreshing(false);
    }
  }, [refreshing]);

  const startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    status === 'granted' ? setCameraPermission(true) : Alert.alert('Access denied')
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
        setImage(photo);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const savePhoto = async () => {
    router.back();
    console.log(image); 
    let uploadedImage = null;
    if (image != null) {
      const { data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}`, { uri: image, type: 'jpg', name: 'name.jpg' });
      if (error != null) {
        console.log(error);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);
      uploadedImage = publicUrl;
      console.log(uploadedImage); 
    }

    const { error } = await supabase.from('posts').insert({ 
      creator_id: user.id, 
      post: uploadedImage,
      username: currUser, 
      description: "study", 
      create_date: new Date().toISOString(), 
      create_time: new Date().toISOString()
    }).select().single();

    if (error != null) {
      console.log(error);
      return;
    }
    console.log("image uploaded 2"); 
  }

  const retakePicture = () => {
    setImage(null)
    startCamera()
  }

  const changeFlashMode = () => {
    setFlashMode(flashMode => !flashMode)
  }

  const switchCamera = () => {
    cameraType === 'back' ? setCameraType('front') : setCameraType('back')
  }

  const router = useRouter();
  return (
    <View style={styles.container}>
        <View style={styles.screenDisplay}>
          {image ? (
            <CameraPreview photo={image} savePhoto={savePhoto} retakePicture={retakePicture} />
          ) : (
            <Camera type={cameraType} flashMode={flashMode} style={styles.cameraDisplay} ref={cameraRef}>
              <View style={styles.exitContainer}>
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                  }}
                >
                  <View style={styles.exitButtonContainer}>
                    <Image source={require('../assets/exit.png')} resizeMode='contain' style={styles.icon}/>
                  </View>
                </TouchableOpacity>
              </View>
              
              <View style={styles.allButtonsContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={changeFlashMode} style={styles.button}>
                    <View style={styles.iconContainer}>
                      {flashMode && <Image source={require('../assets/flashOn.png')} resizeMode='contain' style={styles.icon}/>}
                      {!flashMode && <Image source={require('../assets/flashOff.png')} resizeMode='contain' style={styles.icon}/>}    
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      alignSelf:'center'
                    }}>
                    <View style={styles.shutterContainer}>
                      <Image source={require('../assets/shutterButton.png')} resizeMode='contain' style={styles.icon}/>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={switchCamera} style={styles.button}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../assets/flipCamera.png')} resizeMode='contain' style={styles.icon}/>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Camera>
          )}
        </View>
    </View>
  )
}

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  return (
    <View style={styles.preview}>
      <ImageBackground source={{uri: photo && photo.uri}} style={{flex: 1}}>
        <View style={styles.optionsContainer}>
          <View style={styles.options}>
            <TouchableOpacity onPress={retakePicture} style={styles.textContainer}>
              <Text style={styles.text}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={styles.textContainer}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenDisplay: {
    flex: 1,
    width: '100%'
  },
  cameraDisplay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  allButtonsContainer: {
    position: 'absolute',
    top: '84%',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40
  },
  shutterContainer: {
    width: 90,
    height: 90
  },
  exitContainer: {
    position:'absolute',
    top:'8%',
    left: '5%'
  },
  exitButtonContainer: {
    width: 20,
    height: 20
  },
  icon: {
    width: undefined,
    height: undefined,
    flex: 1,
    tintColor: 'white'
  },
  button: {
    borderRadius: '50%',
    height: 40,
    width: 40,
  },
  flashButton: {
    borderRadius: '50%',
    height: 40,
    width: 40
  },
  camera: {
    flex: 1,
    position: "relative",
  },
  preview: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  }, 
  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  textContainer: {
    width: 110,
    height: 70,
    alignItems: 'center',
    borderRadius: 4
  }, 
  text: {
    color: 'white',
    fontSize: 20
  }
})