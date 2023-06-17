import { Stack, Link, Tabs } from "expo-router";
import { AuthProvider } from "../contexts/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name='(home)'
          />
      </Stack>
    </AuthProvider>
    
  );
}