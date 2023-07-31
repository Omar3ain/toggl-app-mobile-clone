import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/login';
import Tasks from '../screens/home/Tasks';



const Stack = createStackNavigator();

export default function Home() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={Tasks}  />
      </Stack.Navigator>
  );
}
