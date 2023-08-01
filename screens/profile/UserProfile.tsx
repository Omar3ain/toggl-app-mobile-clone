import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import RegisterProps from '../../utils/interfaces/RegisterProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';




export default function UserProfile({ navigation }: RegisterProps) {
const [user, setUser] = useState<any>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('current_user');
    navigation.dispatch(StackActions.replace('Main'));
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('current_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    getCurrentUser();
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate({name:'Profile info' , params:{}})}
      >
        <View style={styles.right}>
          <View style={styles.beforeTitle}>
            <Icon name="person-outline" size={28} color="#28aad2"/>
          </View>
          <Text style={styles.buttonText}>Profile info</Text>
        </View>
        <Icon name="chevron-right" size={28} color="grey"/>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <View style={styles.right}>
          <View style={styles.beforeTitle}>
            <Icon name="logout" size={28} color="#28aad2"/>
          </View>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
        <Icon name="chevron-right" size={28} color="grey"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',

  },
  header:{
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: 'none',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonArrow: {
    fontSize: 20,
  },
  beforeTitle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7f8f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
