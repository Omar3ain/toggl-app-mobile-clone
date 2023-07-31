import { createStackNavigator } from '@react-navigation/stack';
import InBoardingOne from '../screens/inBoarding/InBoardingOne';
import InBoardingTwo from '../screens/inBoarding/InBoardingTwo';
import InBoardingThree from '../screens/inBoarding/InBoardingThree';


const Stack = createStackNavigator();

export default function InBoarding() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="In boarding one" component={InBoardingOne} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding two" component={InBoardingTwo} options={{ headerShown: false }} />
        <Stack.Screen name="In boarding three" component={InBoardingThree} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}


