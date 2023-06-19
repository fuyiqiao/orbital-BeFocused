import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { useRouter } from "expo-router";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <View style={styles.backButtonContainer}>
            <Image source={require('../assets/back.png')} resizeMode='contain' style={styles.icon}/>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>This is the settings page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backContainer: {
    position:'absolute',
    top:'8%',
    left: '5%'
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
})