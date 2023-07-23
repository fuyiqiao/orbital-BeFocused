import { Stack, Link, Tabs } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import CameraPage from "./camera";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false}}>
        
      </Stack>
    </AuthProvider>
    
  );
}