import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
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

export default function Cart({ route, navigation }) {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    async function fetchCart() {

      const currentUid = firebase.auth().currentUser.uid;

      const currentUserCart = await firebase.firestore().collection('Clients').doc(currentUid).get();
      const items = currentUserCart.data().currentCartItem;
      let dishList = [];

      items.forEach(element =>  { 
        dishList.push(element);
      });
      setCartItem(dishList);
    }

    fetchCart();
  },);
  const deleteToCart = (dish) => {

    const uid = firebase.auth().currentUser.uid;

    const userCart = firebase.firestore().collection('Clients').doc(uid);
    userCart.update({currentCartItem: firebase.firestore.FieldValue.arrayRemove(dish)})

    alert("Item deleted to cart !");
  }
  const confirmOrder = () => {
    navigation.navigate("TableTimeReservation", {
      dishList: cartItem,
      uid: "2sH1gPONg3MvwYMDn4LU3aGRZAN2",
      restaurantid: cartItem.restaurantId,
    })
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        {cartItem.map((dish) => (
          <View style={styles.dishBox}>
            <Image style={styles.logoPicture} source={icons.burger} />
            <Text style={styles.restaurantText}> Dish Name : {dish.name}</Text>
            <Text style={styles.restaurantText}>
              {" "}
              Dish Price : {dish.price}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
               <TouchableOpacity
                onPress={() => deleteToCart(dish)}
              >
                <Image style={styles.dishBoxIcons} source={icons.delete_icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => confirmOrder()}>
          <Text style={styles.buttonTitle}> Confirm Order </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
