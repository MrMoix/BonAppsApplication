import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";


export default function BenefitsScreen({ navigation }) {
  return (
    <View style={styles.container2}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo2} source={require("../../assets/logo.png")} />

        <Text style={styles.TitleText}>Why join us ? </Text>

        <Text style={styles.NormalText}>1. Benefit</Text>

        <Text style={styles.NormalText}>2. Benefit</Text>

        <Text style={styles.NormalText}>3. Benefit</Text>

        <Text style={styles.NormalText}>4. Benefit</Text>

        <Text style={styles.NormalText}>5. Benefit</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => { navigation.navigate("RestaurantSignUp") }}
        >
          <Text style={styles.buttonTitle}>Next</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}