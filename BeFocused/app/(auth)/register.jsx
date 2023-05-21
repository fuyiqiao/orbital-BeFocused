import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, StyleSheet } from "react-native";
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

            <View style={style.errorBox}>
                {errMsg !== "" && <Text>{errMsg}</Text>}
            </View>

            <View style={style.submitBox}>
                <Button onPress={handleSubmit}>Submit</Button>
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
        paddingBottom: 50, 
        textAlign: 'center'
    },
    titleBox: {
        flex: 3,
        justifyContent: 'center'
    },
    emailBox: {
        flex: 1,
        paddingBottom:30
    },
    passwordBox: {
        flex: 1,
        paddingBottom:30
    },
    submitBox: {
        flex: 5,
        paddingBottom: 70,
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
