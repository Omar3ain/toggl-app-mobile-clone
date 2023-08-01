import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import RegisterProps from '../../utils/interfaces/RegisterProps';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function UserData({ navigation }: RegisterProps) {
    const [user, setUser] = useState<any>();


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
    <SafeAreaView style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>First Name:</Text>
          <Text style={styles.userDataValue}>{user?.firstName}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Last Name:</Text>
          <Text style={styles.userDataValue}>{user?.lastName}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Email:</Text>
          <Text style={styles.userDataValue}>{user?.email}</Text>
        </View>

        <View style={styles.fieldData}>
          <Text style={styles.userDataText}>Username:</Text>
          <Text style={styles.userDataValue}>{user?.username}</Text>
        </View>

      </View>
    </SafeAreaView>
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
  fieldData:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDataContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userDataValue: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'normal',
    marginLeft: 10,
  },
});
