import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./navigation/MainNavigator";



const Stack = createStackNavigator();

export default function Main(): JSX.Element {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
