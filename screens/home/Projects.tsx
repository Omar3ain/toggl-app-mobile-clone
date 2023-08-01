import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, CheckBox, Dialog } from '@rneui/base';

const CreationPage = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [visible5, setVisible5] = useState(false);

  const [checked, setChecked] = useState(1);
  const toggleDialog5 = () => {
    setVisible5(!visible5);
  };
  const handleCreateTask = () => {
    // Perform task creation action with taskName, taskDescription, startTime, and endTime
    console.log('Task created successfully!');
    // Clear the form fields
    setTaskName('');
    setTaskDescription('');
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const handleStartTimeChange = (event : any, selectedTime : any) => {
    setShowStartTimePicker(false);
    setStartTime(selectedTime || new Date());
  };

  const handleEndTimeChange = (event : any, selectedTime : any) => {
    setShowEndTimePicker(false);
    setEndTime(selectedTime || new Date());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        onChangeText={setTaskName}
        value={taskName}
        maxLength={100}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        onChangeText={setTaskDescription}
        value={taskDescription}
        maxLength={300}
      />
      <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowStartTimePicker(true)}>
        <Text>Start Time: {startTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
      <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowEndTimePicker(true)}>
        <Text>End Time: {endTime.toLocaleTimeString()}</Text>
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
      <TouchableOpacity

onPress={toggleDialog5}

>
<Text>Helloo</Text>
</TouchableOpacity>
      <Dialog
      isVisible={visible5}
      onBackdropPress={toggleDialog5}
    >

      <Dialog.Title title="Select Preference"/>
      {['Option 1', 'Option 2', 'Option 3'].map((l, i) => (
        <CheckBox
          key={i}
          title={l}
          containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked === i + 1}
          onPress={() => setChecked(i + 1)}
        />
      ))}

      <Dialog.Actions>
        <Dialog.Button
          title="CONFIRM"
          onPress={() => {
            console.log(`Option ${checked} was selected!`);
            toggleDialog5();
          }}
        />
        <Dialog.Button title="CANCEL" onPress={toggleDialog5} />
      </Dialog.Actions>
    </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  timePickerButton: {
    padding: 10,
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#2cb8e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default CreationPage;
