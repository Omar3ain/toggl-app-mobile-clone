import { createStackNavigator } from '@react-navigation/stack';
import Projects from '../screens/home/Projects';



const Stack = createStackNavigator();

export default function Home() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Projects" component={Projects}  options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
