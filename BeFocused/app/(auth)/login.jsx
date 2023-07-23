import { View, StyleSheet,TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Stack } from "expo-router";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

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

        <View style={styles.loginBox}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerBox}>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => {router.push('/register')}}>
            <Text style={styles.registerButtonText}>New user? Sign up</Text>
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
    backgroundColor:'white',
    justifyContent: 'center',
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
  loginBox: {
    position: 'absolute',
    top: '50%',
    width:'100%',
    alignSelf: 'center'
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#304d6b',
    borderRadius: 40,
    padding: 15
  },
  registerBox: {
    position: 'absolute',
    top: '90%',
    width:'100%',
    alignSelf: 'center'
  },
  registerButton: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#304d6b',
    padding: 15
  },
  errorBox: {
    position: 'absolute',
    top: '45%',
    width:'100%',
    alignSelf: 'center'
  },
  signupButtonContainer: {
    position: 'absolute',
    top: '60%',
    width:'100%',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 50, 
    textAlign: 'center'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  registerButtonText: {
    color: "#304d6b",
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
  },
  signUpText: {
    color: "#304d6b",
    fontSize: 16,
    textAlign: 'center'
  }
});