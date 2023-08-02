import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegisterProps from '../../utils/interfaces/RegisterProps';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useFocusEffect } from '@react-navigation/native';

interface Task {
  taskId: string;
  userId: string;
  taskName: string;
  taskDescription: string;
  startTime: Date;
  endTime: Date;
}

const ListTasks = ({ navigation }: RegisterProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTasks = async () => {
    try {
      const currentUserData = await AsyncStorage.getItem('current_user');
      const currentUser = JSON.parse(currentUserData as string);
      const userId = currentUser.id;

      const existingTasks = await AsyncStorage.getItem('tasks');
      if (existingTasks) {
        const tasksData = JSON.parse(existingTasks) as Task[];
        const userTasks = tasksData.filter((task) => task.userId === userId);

        userTasks.sort((a, b) => {
          const first = new Date(a.startTime)
          const second = new Date(b.startTime)
          return first.getTime() - second.getTime()
        });

        setTasks(userTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useFocusEffect(() => {
    fetchTasks();
  });

  const handleDeleteTask = async (taskId: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.taskId !== taskId);
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  const calculateDuration = (start: Date, end: Date) => {
    const durationInMs = +new Date(end) - +new Date(start);
    const seconds = Math.floor(durationInMs / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };



  return (
    <View style={styles.container}>
    <Text style={styles.header}>All Your Tasks</Text>
    {tasks.length > 0 ? (
      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.taskId} style={styles.taskItem}>
            <View>
              <Text style={styles.taskName}>{task.taskName}</Text>
              {task.taskDescription ? (
                <Text style={styles.taskDescription}>{task.taskDescription}</Text>
              ) : null}

              <Text style={styles.taskTime}>Duration Time : {calculateDuration(task.startTime, task.endTime)}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(task.taskId)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    ) : (
      <View style={styles.noTasksContainer}>
        <Text style={styles.noTasksText}>No tasks yet</Text>
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  taskList: {
    width: '100%',
  },
  taskItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  taskTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'darkred',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ListTasks;
