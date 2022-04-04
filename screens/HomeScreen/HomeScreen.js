import React from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.push("LoginScreen"));
  };

  const openRestaurant = (restaurant) => {
    navigation.push("RestaurantInfo", {
      restaurantTitle: restaurant,
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>Restaurants near you</Text>

      {/* first card */}
      <TouchableOpacity
        style={styles.restaurantCard}
        onPress={() => openRestaurant("kfc")}
      >
        <Image
          style={styles.logoPicture}
          source={require("../../assets/kfc.png")}
        />
        <View style={styles.restaurantContainer}>
          <Text style={styles.restuarantTitle}>KFC {"\n"} </Text>

          <View style={styles.restaurantDesc}>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/clock.png")}
            />
            <Text style={{ fontSize: 18 }}> 45 min {"\n"} </Text>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/dollar.png")}
            />
            <Text> </Text>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/eye.png")}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* second card */}
      <TouchableOpacity
        style={styles.restaurantCard}
        onPress={() => openRestaurant("burger king")}
      >
        <Image
          style={styles.logoPicture}
          source={require("../../assets/burger_king.png")}
        />
        <View style={styles.restaurantContainer}>
          <Text style={styles.restuarantTitle}>Burger King {"\n"} </Text>

          <View style={styles.restaurantDesc}>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/clock.png")}
            />
            <Text style={{ fontSize: 18 }}> 30 min {"\n"} </Text>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/dollar.png")}
            />
            <Image
              style={styles.icons}
              source={require("../../assets/icons/dollar.png")}
            />
            <Text> </Text>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/eye.png")}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* third card */}
      <TouchableOpacity
        style={styles.restaurantCard}
        onPress={() => openRestaurant("Dominos Pizza")}
      >
        <Image
          style={styles.logoPicture}
          source={require("../../assets/domino_pizza.png")}
        />
        <View style={styles.restaurantContainer}>
          <Text style={styles.restuarantTitle}>Domino Pizza {"\n"} </Text>

          <View style={styles.restaurantDesc}>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/clock.png")}
            />
            <Text style={{ fontSize: 18 }}> 70 min {"\n"} </Text>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/dollar.png")}
            />
            <Image
              style={styles.icons}
              source={require("../../assets/icons/dollar.png")}
            />
            <Image
              style={styles.icons}
              source={require("../../assets/icons/dollar.png")}
            />
            <Text> </Text>
            <Image
              style={styles.icons}
              source={require("../../assets/icons/eye.png")}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
        <Text style={styles.buttonTitle}> Log Out </Text>
      </TouchableOpacity>
    </View>
  );
}
