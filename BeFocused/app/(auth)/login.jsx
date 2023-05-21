import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

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
        <View style={style.container}>
            
        
            <View style={style.titleBox}>
                <Text style={style.title}>BeFocused</Text>
            </View>
            
            <View style={style.emailBox}>
                <TextInput 
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail} />
            </View>
            
            <View style={style.passwordBox}>
                <TextInput
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword} />
            </View>

            <View style={style.signup}>
                <Link href="/register">
                    <Button>Sign up</Button>
                </Link>
            </View>

            <View style={style.errorBox}>
                {errMsg !== "" && <Text>{errMsg}</Text>}
            </View>

            <View style={style.submitBox}>
                <Button 
                    
                    style={style.button} 
                    onPress={handleSubmit}>Submit</Button>
            </View>
            
            {loading && <ActivityIndicator />}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 60, 
        textAlign: 'center'
    },
    titleBox: {
        flex: 5,
        justifyContent: 'center'
    },
    emailBox: {
        flex: 2,
        justifyContent: 'center'
    },
    passwordBox: {
        flex: 2,
        justifyContent: 'center'
    },
    signup: {
        flex: 1,
        justifyContent: 'center'
    },
    submitBox: {
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
        justifyContent: 'center'
    }
});
