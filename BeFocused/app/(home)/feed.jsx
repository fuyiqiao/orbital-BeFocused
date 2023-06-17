import { Link, Tabs } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'

export default function FeedPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the feed page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})