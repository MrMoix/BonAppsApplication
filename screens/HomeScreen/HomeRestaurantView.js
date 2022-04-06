import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import icons from "../../constants/icons";
import AddDish from "./AddDish";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import RestaurantInfo from "./RestaurantInfo";
import { Button } from "react-native-web";

function MyAccount({ navigation }, props) {
  const restaurantTitle = "kfc";
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate("LoginScreen"));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4BBE77",
      }}
    >
      <Text>Connected</Text>
      <View>
        {/* <Text style={styles.title}>Home Screen</Text> */}
        <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const restaurantTitle = "kfc";
function Dishes(props) {
  const restaurantTitle = "kfc";
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

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  const [refresh, setRefresh] = useState(false);

  const pullMe = React.useCallback(() => {
    setRefresh(true);

    wait(2000).then(() => {
      setRefresh(false);
    });
  }, [refresh]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#4BBE77" }}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      >
        {props.dishes.map((dish) => (
          <View style={styles.dishBox}>
            <Image style={styles.logoPicture} source={icons.burger} />
            <Text style={styles.restaurantText}>Dish Name : {dish.name}</Text>

            <Text style={styles.restaurantText}>Dish Price : {dish.price}</Text>

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
            style={styles.buttonAdd}
            onPress={() => props.navigation.navigate("AddDish")}
          >
            <Text style={styles.buttonTitle}>+</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function HomeRestaurantView({ navigation }) {
  const [restaurantData, setRestaurantData] = useState({});
  const [dishes, setDishes] = useState([]);
  const [dishDocs, setDishDocs] = useState([]);

  const dishList = [];

  useEffect(() => {
    async function fetchMenu() {
      const currentUser = firebase.auth().currentUser;
      let restaurantTitle = currentUser.uid;
      // route param uid instead of name
      const snapshot = await firebase
        .firestore()
        .collection("Restaurant")
        .where("id", "==", restaurantTitle)
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
          tabBarLabelStyle: { fontSize: 20, color: "white" },
          //tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "#4BBE77" },
        }}
        //style={styles.top}
      >
        <Tab.Screen
          name="My Account"
          options={{ title: "My Account", headerBackVisible: false }}
        >
          {() => <MyAccount navigation={navigation}></MyAccount>}
        </Tab.Screen>
        <Tab.Screen name="Dishes">
          {() => <Dishes dishes={dishes} navigation={navigation}></Dishes>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
