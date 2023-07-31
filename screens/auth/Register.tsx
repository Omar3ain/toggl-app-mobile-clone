import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterProps {
  navigation: NavigationProp<Record<string, object>>;
}

export default function Register({ navigation }: RegisterProps){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  const handleSignUp = async () => {
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        username,
     };
     try {
        const userData = await AsyncStorage.getItem('users');
        let users = [];

        if (userData !== null) {
          users = JSON.parse(userData);
        }

        users.push(newUser);

        await AsyncStorage.setItem('users', JSON.stringify(users));

        navigation.navigate({name: 'Login',params:{}});
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Register</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name..."
              placeholderTextColor="gray"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name..."
              placeholderTextColor="gray"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email..."
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              placeholderTextColor="gray"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your username..."
              placeholderTextColor="gray"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.createAccountButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginTop: 20}}>
          <Text style={{ fontSize: 16 }}>Have an account?{' '}
            <TouchableOpacity onPress={()=> navigation.navigate({name: 'Login',params:{}})}>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
        </ScrollView>
      </View>
);

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,

    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    formContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    inputContainer: {
      marginBottom: 16,
      width: '100%',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
    },
    label: {
      color: '#727171',
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'left',
    },
    button: {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor:'#2cb8e5',
      borderRadius: 5
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 32,
      marginBottom: 32,
    },
    divider: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#727171',
      width: 150,
    },
    dividerText: {
      marginHorizontal: 8,
      color: '#727171',
      fontWeight: 'bold',
    },
    createAccountButton: {
      backgroundColor: '#4caf50',
      padding: 15,
      width: '65%',
    },
    createAccountButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
