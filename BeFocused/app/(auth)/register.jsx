import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { Stack } from "expo-router";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async () => {
        if (email == '') {
            setErrMsg("Email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("Password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
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
                        options={{title: "Sign Up"}}
                    />

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

                    <View style={styles.signUpBox}>
                        <TouchableOpacity 
                            style={styles.signUpButton}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sign Up</Text>
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
        justifyContent: 'center',
        backgroundColor:'white'
    },
    inner: {
        flex: 1,
        padding: 20,
    },
    titleBox: {
        flex: 3,
        justifyContent: 'flex-start',
        paddingTop:10
    },
    emailBox: {
        flex: 2,
        justifyContent: 'center',
    },
    passwordBox: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    signUpBox: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingBottom: 20
    },
    errorBox: {
        flex: 2,
        justifyContent: 'center',
    },
    signUpButton: {
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