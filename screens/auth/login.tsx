import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterProps from "../../utils/interfaces/RegisterProps";
import { StackActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";



export default function Login({ navigation }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
    const handleEmailChange = (text : string) => {
      setEmail(text);
      const emailRegex = /\S+@\S+\.\S+/;
      setIsEmailValid(emailRegex.test(text));
    };

    const handlePasswordChange = (text : string) => {
      setPassword(text);
      setIsPasswordValid(text.length >= 8);
    };

    const handleEmailFocus = () => {
      setIsEmailFocused(true);
    };

    const handleEmailBlur = () => {
      setIsEmailFocused(false);
    };

    const handlePasswordFocus = () => {
      setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
      setIsPasswordFocused(false);
    };


  const handleLogin = async () => {
    if (isEmailValid && isPasswordValid) {
      try {
        const userData = await AsyncStorage.getItem('users');
        const users = JSON.parse(userData as string);
        const user = users.find((u : any) => u.email === email);
        if (user && user.password === password) {
          await AsyncStorage.setItem('current_user', JSON.stringify(user));
          navigation.dispatch(StackActions.replace('Main'));
        } else {
          Toast.show({
            type: "error",
            text1: "Login Status",
            text2: "Invalid Email or Password...",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleForgotPassword = () => {
    Linking.openURL('https://toggl.com/track/forgot-password/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
                style={[styles.input, isEmailFocused && !isEmailValid && styles.invalidInput]}
                placeholder="Enter your email..."
                value={email}
                onChangeText={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, isPasswordFocused && !isPasswordValid && styles.invalidInput]}
              placeholder="Enter your Password..."
              value={password}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
          </View>
        </View>
        <TouchableOpacity style={[styles.button, !(isEmailValid && isPasswordValid) && styles.disabledButton]}
         disabled={!(isEmailValid && isPasswordValid)}
         onPress={handleLogin}>
          <Text style={styles.createAccountButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate({name :"Register" , params:{}})}
      >
        <Text style={styles.createAccountButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "column",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  label: {
    color: "#727171",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
  },
  button: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#2cb8e5',
    borderRadius: 5
  },
  disabledButton: {
    opacity: 0.5,

  },
  forgotPasswordLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#727171",
    width: 150,
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#727171",
    fontWeight: "bold",
  },
  createAccountButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    width: "65%",
  },
  createAccountButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
