
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useEffect, useState } from "react";

import InBoarding from "./InBoarding";
import AppTabs from "./AppTabs";
import Auth from "./Auth";




const Stack = createStackNavigator();

export default function MainNavigator() {
  const [user, setUser] = useState<any>();
  const getCurrentUser = async () => {
    try {
      const userData=  await AsyncStorage.getItem('current_user');
      setUser(JSON.parse(userData as string));

    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };
  useEffect(() => {
    getCurrentUser();


  }, []);



  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="InBoarding" component={InBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        </>
      ) : (
        <>
           <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
        </>
      )}

    </Stack.Navigator>
  );
}
