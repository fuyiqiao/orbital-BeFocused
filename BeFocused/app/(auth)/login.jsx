import { View, StyleSheet,TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Stack } from "expo-router";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("Email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("Password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    
                    <Stack.Screen
                        options={{title: "Login"}}
                    />

                    <View style={styles.signupButton}>
                        <Link href="/register">
                            <Button textColor="#304d6b">Sign up</Button>
                        </Link>
                    </View>

                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>BeFocused</Text>
                    </View>
                    
                    <View style={styles.emailBox}>
                        <TextInput 
                            style={styles.input}
                            placeholder= "Email"
                            placeholderTextColor='#b2b4b3'
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize= 'none'
                            textContentType= 'emailAddress'
                            mode='outlined'
                            outlineColor="#d7d8d8"/>
                    </View>
                    
                    <View style={styles.passwordBox}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize='none'
                            textContentType='password'
                            placeholder="Password"
                            placeholderTextColor='#b2b4b3'
                            value={password}
                            onChangeText={setPassword} 
                            mode='outlined'
                            outlineColor="#d7d8d8"/>
                    </View>

                    <View style={styles.errorBox}>
                        {errMsg !== "" && <Text>{errMsg}</Text>}
                    </View>

                    <View style={styles.loginBox}>
                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>

                    {loading && <ActivityIndicator />}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center'
    },
    inner: {
        flex: 1,
        padding: 20,
    },
    titleBox: {
        flex: 2,
        justifyContent: 'flex-start'
    },
    emailBox: {
        flex: 2,
        justifyContent: 'center',
    },
    passwordBox: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    loginBox: {
        flex: 2,
        justifyContent:'flex-end',
        paddingBottom: 20
    },
    errorBox: {
        flex: 2,
        justifyContent: 'center',
    },
    signupButton: {
        flex: 2,
        justifyContent: 'center',
        flexDirection:'row',
        alignSelf:'flex-end',
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: '#304d6b',
        borderRadius: 40,
        padding: 15
    },
    titleText: {
        fontSize: 60, 
        textAlign: 'center'
    },
    buttonText: {
        color: 'white'
    },
    input: {
        backgroundColor: '#f0f0f0',
    },

});
