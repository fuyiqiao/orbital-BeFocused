import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';

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
        <View style={style.container}>
            <View style={style.titleBox}>
                <Text style={style.titleText}>BeFocused</Text>
            </View>
            
            <View style={style.emailBox}>
                <TextInput 
                    style={style.input}
                    placeholder= "Email"
                    placeholderTextColor='#b2b4b3'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize= 'none'
                    textContentType= 'emailAddress'
                    mode='outlined'
                    outlineColor="#d7d8d8"/>
            </View>
            
            <View style={style.passwordBox}>
                <TextInput
                    style={style.input}
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

            <View style={style.errorBox}>
                {errMsg !== "" && <Text>{errMsg}</Text>}
            </View>

            <View style={style.signUpBox}>
                <TouchableOpacity 
                    style={style.signUpButton}
                    onPress={handleSubmit}>
                    <Text style={style.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            
            {loading && <ActivityIndicator />}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:'white'
    },
    titleBox: {
        flex: 5,
        justifyContent: 'center'
    },
    emailBox: {
        flex: 2,
        justifyContent: 'center',
    },
    passwordBox: {
        flex: 2,
        justifyContent: 'center',
    },
    signUpBox: {
        flex: 4,
        paddingBottom: 50,
        justifyContent: 'flex-end'
    },
    subtitle: {
        fontSize: 15, 
        paddingBottom: 10
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