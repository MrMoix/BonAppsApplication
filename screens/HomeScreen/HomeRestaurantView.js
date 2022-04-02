import React from "react";
import { firebase } from "../../firebase/config";
import { Text, Image, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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

function Dishes() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Dishes!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function HomeRestaurantView({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 20 },
          //tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "powderblue" },
        }}
        style={styles.topTabsNav}
      >
        <Tab.Screen name="My Account" component={() => MyAccount(navigation)} />
        <Tab.Screen name="Dishes" component={Dishes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// export default function HomeRestaurantView({ navigation }) {
//   const onLogOutPress = () => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => navigation.navigate("Login"));
//   };
//   return (
//     <View style={{ marginTop: 100, marginLeft: 50 }}>
//       <Text style={styles.title}>Home Screen</Text>
//       <TouchableOpacity style={styles.button} onPress={() => onLogOutPress()}>
//         <Text style={styles.buttonTitle}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
