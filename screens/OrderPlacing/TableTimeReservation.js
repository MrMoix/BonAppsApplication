import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import SwitchSelector from "react-native-switch-selector";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import icons from "../../constants/icons";

export default function TableTimeReservation({ navigation }) {
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [studentPrice, setStudentPrice] = useState("");
  const [orderType, setOrderType] = useState(true);
  const [tablePlaces, setTablePlaces] = useState("");

  const restaurantTitle = "kfc";
  const addDish = async () => {
    const currentUser = firebase.auth().currentUser;
    const restaurantTitle = currentUser.uid;
    const snapshot = await firebase
      .firestore()
      .collection("Restaurant")
      .where("id", "==", restaurantTitle)
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

        <SwitchSelector
          initial={0}
          onPress={(value) => {
            setOrderType(value);
          }}
          textColor={color.purple} //'#7a44cf'
          selectedColor={color.white}
          buttonColor={color.purple}
          borderColor={color.purple}
          hasPadding
          options={[
            { label: "Eat in", value: true }, // imageIcon: images.feminino images.feminino = require('./path_to/assets/img/feminino.png')
            {
              label: "Take away",
              value: false,
            },
          ]}
          testID="order-type-selector"
          accessibilityLabel="order-type-selector"
        />
        {orderType && (
          <View>
            <Text>Reserve table </Text>
            <TextInput
              style={styles.input}
              placeholder="Number of places"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setTablePlaces(text)}
              value={tablePlaces}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        )}
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