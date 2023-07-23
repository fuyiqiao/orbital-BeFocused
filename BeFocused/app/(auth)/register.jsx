import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { Stack, useRouter } from "expo-router";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

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
    router.push('/createProfile');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>  
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
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginBox}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => {router.back()}}>
            <Text style={styles.loginButtonText}>Have an account? Log In</Text>
          </TouchableOpacity>
        </View>
        
        {loading && <ActivityIndicator />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white',
    padding: 20,
  },
  titleBox: {
    position: 'absolute',
    top: '10%',
    width:'100%',
    alignSelf: 'center'
  },
  emailBox: {
    position: 'absolute',
    top: '25%',
    width:'100%',
    alignSelf: 'center'
  },
  passwordBox: {
    position: 'absolute',
    top: '35%',
    width:'100%',
    alignSelf: 'center'
  },
  signUpBox: {
    position: 'absolute',
    top: '50%',
    width:'100%',
    alignSelf: 'center'
  },
  errorBox: {
    position: 'absolute',
    top: '45%',
    width:'100%',
    alignSelf: 'center'
  },
  signUpButton: {
    alignItems: 'center',
    backgroundColor: '#304d6b',
    borderRadius: 40,
    padding: 15
  },
  titleText: {
    fontSize: 50, 
    textAlign: 'center'
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
  },
  loginBox: {
    position: 'absolute',
    top: '90%',
    width:'100%',
    alignSelf: 'center'
  },
  loginButton: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#304d6b',
    padding: 15
  },
  loginButtonText: {
    color: '#304d6b',
    fontSize: 16,
  },
});