import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./navigation/MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";



const Stack = createStackNavigator();

export default function Main(): JSX.Element {
    const checkUsersInStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('users');
        if (userData === null) {
          await AsyncStorage.setItem('users', JSON.stringify([]));
        }
      } catch (error) {
        console.error('Error checking users in AsyncStorage:', error);
      }
    };

    useEffect(() => {
      checkUsersInStorage();
    }, []);

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
