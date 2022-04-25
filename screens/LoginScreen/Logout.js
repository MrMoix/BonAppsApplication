import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function Logout({ navigation }) {
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate("Login"));
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo2} source={require("../../assets/logo.png")} />

        <Text style={styles.NormalText}>
          Are you sure you want to log out?{" "}
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
          <Text style={styles.buttonTitle}> Log Out </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
