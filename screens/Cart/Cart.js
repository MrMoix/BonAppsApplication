import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { collection, doc, setDoc, arrayUnion } from "firebase/firestore";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { setStatusBarBackgroundColor } from "expo-status-bar";

export default function Cart({ route, navigation }) {
  const [userData, setUserData] = useState({});
  const [cartItem, setCartItem] = useState([]);
  const dishList = [];

  useEffect(() => {
    async function fetchCart() {

      const currentUid = firebase.auth().currentUser.uid;

      const currentUserCart = firebase.firestore().collection('Clients').doc(currentUid).get();
        
      dishList.push(currentUserCart.data());
  }

    fetchCart();
  },);
  const confirmOrder = () => {
    navigation.navigate("TableTimeReservation", {
      dishList: dishList,
      uid: "2sH1gPONg3MvwYMDn4LU3aGRZAN2",
      restaurantid: "L81dYiej2fgz6UQFAMV6",
    })};
  return (
    <View
      style={{
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4BBE77",
      }}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", borderRadius: 5 }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.restaurantText}> Dish Name : {userData.name}</Text>
        <TouchableOpacity style={styles.button} onPress={() => confirmOrder()}>
        <Text style={styles.buttonTitle}> Confirm Order </Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
