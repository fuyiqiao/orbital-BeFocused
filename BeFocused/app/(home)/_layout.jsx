import { Tabs } from "expo-router";

export default function HomeScreen() {
    return (
        <Tabs>
            <Tabs.Screen name="timer" options={{ title: "Timer" }} />
            <Tabs.Screen name="newTodo" options={{ title: "Feed" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}
