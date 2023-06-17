import { Stack } from "expo-router";
import LoginPage from "./login";

export const unstable_settings = {
    initialRouteName: "login",
};

export default function AuthRoot() {
    return (
        <Stack initialRouteName="login"/>
    );
}