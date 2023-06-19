import { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera } from 'expo-camera'

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(false)
  const [image, setImage] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = useState(false)
  const cameraRef = useRef(null);

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

  const savePhoto = () => {}

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

  return (
    <View style={style.container}>
        <View style={style.screenDisplay}>
          {image ? (
            <CameraPreview photo={image} savePhoto={savePhoto} retakePicture={retakePicture} />
          ) : (
            <Camera type={cameraType} flashMode={flashMode} style={style.cameraDisplay} ref={cameraRef}>
              <View style={style.allButtonsContainer}>
                <View style={style.buttonContainer}>
                  <TouchableOpacity onPress={changeFlashMode} style={style.button}>
                    <View style={style.iconContainer}>
                      {flashMode && <Image source={require('../../assets/flashOn.png')} resizeMode='contain' style={style.icon}/>}
                      {!flashMode && <Image source={require('../../assets/flashOff.png')} resizeMode='contain' style={style.icon}/>}    
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      alignSelf:'center'
                    }}>
                    <View style={style.shutterContainer}>
                      <Image source={require('../../assets/shutterButton.png')} resizeMode='contain' style={style.icon}/>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={style.buttonContainer}>
                  <TouchableOpacity onPress={switchCamera} style={style.button}>
                    <View style={style.iconContainer}>
                      <Image source={require('../../assets/flipCamera.png')} resizeMode='contain' style={style.icon}/>
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
    <View style={style.preview}>
      <ImageBackground source={{uri: photo && photo.uri}} style={{flex: 1}}>
        <View style={style.optionsContainer}>
          <View style={style.options}>
            <TouchableOpacity onPress={retakePicture} style={style.textContainer}>
              <Text style={style.text}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={style.textContainer}>
              <Text style={style.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const style = StyleSheet.create({
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
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  }, 
  text: {
    color: 'white',
    fontSize: 20
  }
})