import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import Profile from './Profile';
import AddTask from '../screens/home/AddTask';
import ListTasks from '../screens/home/ListTasks';




const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Your Tasks"
      screenOptions={{
        tabBarActiveTintColor: '#00a7d5',
      }}
    >
      <Tab.Screen
        name="Your Tasks"
        component={ListTasks}
        options={{
          tabBarLabel: 'Your Tasks',
          tabBarIcon: ({ color, size }) => (
            <Icon name="checklist" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
        <Tab.Screen
        name="AddTask"
        component={AddTask}
        options={{
          tabBarLabel: 'Add Task',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add" color={color} size={size} />
          ),
          headerShown: false
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}
