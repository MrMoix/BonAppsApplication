import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";
import AddDish from "./AddDish";

function MyAccount(props) {
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => props.navigate("Login"));
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My account!</Text>
      <View style={{ marginTop: 100, marginLeft: 50 }}>
        {/* <Text style={styles.title}>Home Screen</Text> */}
        <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Dishes(props) {
  const deleteDish = () => {
    Alert.alert("Alert ", "Are you sure you want to delete this dish?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {props.dishes.map((dish) => (
          <View style={styles.dishBox}>
            <Text style={styles.restaurantText}>Dish Name: {dish.name}</Text>

            <Text style={styles.restaurantText}>Dish Price: {dish.price}</Text>
            <Image style={styles.logoPicture} source={icons.burger} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Image style={styles.dishBoxIcons} source={icons.setting} />
              <TouchableOpacity onPress={() => deleteDish()}>
                <Image style={styles.dishBoxIcons} source={icons.delete_icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View
          style={{
            marginBottom: 15,
            marginTop: 10,
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddDish")}
          >
            <Text
              style={{ color: "#ff6c44", fontSize: 20, fontWeight: "bold" }}
            >
              ADD
            </Text>
            <Image style={styles.icons} source={icons.plus} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();
const restaurantTitle = "kfc";

export default function HomeRestaurantView({ navigation }) {
  const [restaurantData, setRestaurantData] = useState({});
  const [dishes, setDishes] = useState([]);
  const [dishDocs, setDishDocs] = useState([]);

  const dishList = [];

  useEffect(() => {
    async function fetchMenu() {
      // route param uid instead of name
      const snapshot = await firebase
        .firestore()
        .collection("Restaurant")
        .where("name", "==", restaurantTitle)
        .get();

      console.log("docs", snapshot.docs);

      const uid = snapshot.docs[0].id;
      console.log("restaurant uid", uid);

      const restaurantRef = firebase
        .firestore()
        .collection("Restaurant")
        .doc(uid);
      const restaurantDoc = await restaurantRef.get();
      setRestaurantData(restaurantDoc.data());

      const restaurantDishes = await restaurantRef.collection("Dishes").get();

      let dishList = [];

      restaurantDishes.forEach(async (dish) => {
        dishList.push(dish.data());
      });

      console.log("restaurant dishes", dishList);

      console.log(dishList[0].id);

      let docs = [];

      const dishRef = restaurantRef.collection("Dishes");

      const docSnapshot = await dishRef.get();
      docSnapshot.forEach((doc) => {
        //console.log(`${doc.id}`);
        docs.push(doc.id);
      });

      console.log("docssss", docs);

      setDishes(dishList);
      setDishDocs(docs);
    }

    fetchMenu();
  }, [restaurantTitle]);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 20 },
          //tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "#4BBE77" },
        }}
        //style={styles.top}
      >
        <Tab.Screen name="My Account">
          {() => <MyAccount navigation={navigation}></MyAccount>}
        </Tab.Screen>
        <Tab.Screen name="Dishes">
          {() => <Dishes dishes={dishes} navigation={navigation}></Dishes>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
