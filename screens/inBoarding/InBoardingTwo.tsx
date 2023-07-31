import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import RegisterProps from '../../utils/interfaces/RegisterProps';


export default function InBoardingTwo({ navigation }: RegisterProps) {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/2.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.heading}>Create user</Text>
      <Text style={styles.text}>To get started, you need to create a user to track all your projects and to login later...</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate({name: 'In boarding three' , params: {}})}
      >
        <Text style={{ color: '#fff' }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2cb8e5',
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  imageStyle: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: '#2cb8e5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  }
});
