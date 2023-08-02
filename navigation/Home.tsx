import { createStackNavigator } from '@react-navigation/stack';
import Projects from '../screens/home/AddTask';
import AddTask from '../screens/home/AddTask';
import ListTasks from '../screens/home/ListTasks';



const Stack = createStackNavigator();

export default function Home() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="listTasks" component={ListTasks}  options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Add A Task" component={AddTask}  options={{ headerShown: false }}/> */}
      </Stack.Navigator>
  );
}
