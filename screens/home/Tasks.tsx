import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

interface RegisterProps {
    navigation: NavigationProp<Record<string, object>>;

  }

export default function Tasks({ navigation }: RegisterProps) {

  return (
    <View style={styles.container}>

     <Text>TaSKSSSSSSSSSSSSSSSSSSSSSS of </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "column",
  }
});
