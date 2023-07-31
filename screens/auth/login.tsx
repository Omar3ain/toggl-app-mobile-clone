import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterProps {
    navigation: NavigationProp<Record<string, object>>;
  }

export default function Login({ navigation }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");




  const handleLogin = async () => {
    try {
      // Get the user data from local storage
      const userData = await AsyncStorage.getItem('users');
      const users = JSON.parse(userData as string);

      // Find the user object with the given username
      const user = users.find((u : any) => u.username === username);

      if (user && user.password === password) {
        // If the password is correct, store the current user in storage
        await AsyncStorage.setItem('current_user', JSON.stringify(user));

        // Navigate to the home screen
        navigation.navigate({name:'Home' ,params:{}});
      } else {
        // If the credentials are invalid, show an error message
        // alert('Invalid username or password.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username..."
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
          <TextInput
              style={styles.input}
              placeholder="Enter your Password..."
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.createAccountButtonText}>Log in</Text>
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
