import React from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function HomeRestaurantView({ navigation }) {
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate("Login"));
  };
  return (
    <View style={{ marginTop: 100, marginLeft: 50 }}>
      <Text style={styles.title}>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
        <Text style={styles.buttonTitle}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
