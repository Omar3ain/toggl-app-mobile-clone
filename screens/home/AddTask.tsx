import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegisterProps from '../../utils/interfaces/RegisterProps';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const AddTask = ({ navigation }: RegisterProps) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleCreateTask = async () => {
    if (!taskName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Task name cannot be empty',
      });
      return;
    }

    if (!taskDescription.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Task description cannot be empty',
      });
      return;
    }

    if (endTime <= startTime) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'End time cannot be before or equal to start time',
      });
      return;
    }

    const currentUserData = await AsyncStorage.getItem('current_user');
    const currentUser = JSON.parse(currentUserData as string);
    const userId = currentUser.id;

    const task = {
      taskId: Date.now(),
      userId,
      taskName,
      taskDescription,
      startTime,
      endTime,
    };

    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push(task);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task created successfully!',
      });

      setTaskName('');
      setTaskDescription('');
      setStartTime(new Date());
      setEndTime(new Date());
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };


  const handleStartTimeChange = (event : any, selectedTime : any) => {
    setShowStartTimePicker(false);
    setStartTime(selectedTime || new Date());
  };

  const handleEndTimeChange = (event  : any, selectedTime : any) => {
    setShowEndTimePicker(false);
    setEndTime(selectedTime || new Date());
  };

  return (
    <>
    <View style={styles.headerContainer}>
        <Text style={styles.header}>Add Task</Text>
      </View>
    <View style={styles.container}>

      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
        maxLength={100}
      />
      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.input}
        value={taskDescription}
        onChangeText={setTaskDescription}
        maxLength={300}
      />
      <Text style={styles.label}>Task Start Time</Text>
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowStartTimePicker(true)}
      >
        <Text>{startTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
      <Text style={styles.label}>Task End Time</Text>
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowEndTimePicker(true)}
      >
        <Text>{endTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
        />
      )}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
        <Text>Create Task</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignSelf: 'stretch',

    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  timePickerButton: {
    padding: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#2cb8e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default AddTask;
