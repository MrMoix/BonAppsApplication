import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import HomeRestaurantView from "./HomeRestaurantView";

export default function AddDish({ navigation }) {
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [studentPrice, setStudentPrice] = useState("");
  const [logo, setLogo] = useState(null);

  const restaurantTitle = "kfc";

  const addDish = async () => {
    const snapshot = await firebase
      .firestore()
      .collection("Restaurant")
      .where("name", "==", restaurantTitle)
      .get();

    const uid = snapshot.docs[0].id;
    const restaurantRef = firebase
      .firestore()
      .collection("Restaurant")
      .doc(uid);

    const res = await restaurantRef
      .collection("Dishes")
      .add({ name: dishName, price: dishPrice })
      .then(() => {
        navigation.navigate("HomeRestaurantView");
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <TextInput
          style={styles.input}
          placeholder="*Dish Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDishName(text)}
          value={dishName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="*Dish price"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDishPrice(text)}
          value={dishPrice}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Student price"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setStudentPrice(text)}
          value={studentPrice}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Select a logo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addDish();
          }}
        >
          <Text style={styles.buttonTitle}>Add to the menu</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
