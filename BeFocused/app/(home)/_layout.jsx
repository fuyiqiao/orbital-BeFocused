import { Stack, Tabs } from "expo-router";
import { TouchableHighlightBase } from "react-native";
import { Tab } from "react-native-elements";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{headerShown: false}}>
      <Tabs.Screen name="timer" options={{href:'/timer', title: 'Timer'}} />
      <Tabs.Screen name="index" options={{href:"/index", title: 'Index'}} />
      <Tabs.Screen name="feed" options={{href:'/feed', title: 'Feed'}} />
      <Tabs.Screen name="profile" options={{href:'/profile', title: 'Profile'}} />
      
    </Tabs>
  );
}