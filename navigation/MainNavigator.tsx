
import { createStackNavigator } from "@react-navigation/stack";

import { useEffect } from "react";
import Auth from "./Auth";
import Home from "./Home";
import InBoarding from "./InBoarding";





const Stack = createStackNavigator();

export default function MainNavigator() {


  useEffect(() => {}, []);


  return (
    <Stack.Navigator>
          <Stack.Screen name="InBoarding" component={InBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
