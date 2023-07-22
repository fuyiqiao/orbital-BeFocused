import { Stack, Tabs } from "expo-router";
import { TouchableHighlightBase } from "react-native";
import { Tab } from "react-native-elements";

export const unstable_settings = {
  initialRouteName: "timer",
};

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{headerShown: false}}
      initialRouteName="timer"
    >
      <Tabs.Screen name="timer" options={{href:'/timer', title: 'Timer'}} />
      <Tabs.Screen name="index" options={{href:null}} />
      <Tabs.Screen name="feed" options={{href:'/feed', title: 'Feed'}} />
      <Tabs.Screen name="summary" options={{href:'/summary', title: 'Summary'}} />
      <Tabs.Screen name="profile" options={{href:'/profile', title: 'Profile'}} />
    </Tabs>
  );
}